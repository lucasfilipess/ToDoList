import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import Button from '../../components/Button';
import Task from '../../components/Task';
import TextInput from '../../components/TextInput';
import {styles} from './styles';

type TaskProps = {
  id: string;
  title: string;
  isDone: boolean;
};

const Home: React.FC = () => {
  const [taskList, setTaskList] = useState<TaskProps[]>();
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('taskList');
        if (storedData) {
          setTaskList(JSON.parse(storedData));
        }
      } catch (error) {
        Alert.alert(error as string);
      }
    };
    getData();
  }, []);

  const handleSaveTask = async () => {
    try {
      const newTaskList = [
        ...(taskList || []),
        {id: uuid.v4() as string, title: newTask, isDone: false},
      ];
      setTaskList(newTaskList);
      setNewTask('');
      await AsyncStorage.setItem('taskList', JSON.stringify(newTaskList));
    } catch (error) {
      Alert.alert(error as string);
    }
  };

  const changeDoneStatus = async (taskId: string, isDone: boolean) => {
    try {
      const auxTaskList = [...(taskList || [])];
      auxTaskList.forEach(taskItem => {
        if (taskItem.id === taskId) {
          taskItem.isDone = isDone;
        }
      });
      setTaskList(auxTaskList);
      await AsyncStorage.setItem('taskList', JSON.stringify(auxTaskList));
    } catch (error) {
      Alert.alert(error as string);
    }
  };

  const handleOpenTask = (currentTask: TaskProps) => {
    const buttons = [
      {text: 'cancelar'},
      currentTask.isDone
        ? {
            text: 'to do',
            onPress: () => changeDoneStatus(currentTask.id, false),
          }
        : {
            text: 'done',
            onPress: () => changeDoneStatus(currentTask.id, true),
          },
    ];
    Alert.alert(currentTask.title, undefined, buttons);
  };

  const handleClearTaskList = async () => {
    try {
      setTaskList(undefined);
      await AsyncStorage.clear();
    } catch (error) {
      Alert.alert(error as string);
    }
  };

  return (
    <SafeAreaView style={styles.flex}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClearTaskList}>
              <Text style={styles.trash}>🗑</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {taskList?.map(taskItem => {
              const {id, title, isDone} = taskItem;
              return (
                <Task
                  key={id}
                  label={title}
                  isDone={isDone}
                  onPress={() => handleOpenTask(taskItem)}
                />
              );
            })}
          </ScrollView>
          <View style={styles.wrapper}>
            <TextInput value={newTask} onChangeText={setNewTask} width={260} />
            <Button
              label="Salvar"
              onPress={handleSaveTask}
              disabled={!newTask}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Home;
