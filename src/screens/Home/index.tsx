import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppRoutes} from '../../routes';
import Button from '../../components/Button';
import TaskItem from '../../components/TaskItem';
import {styles} from './styles';

type HomeProps = NativeStackScreenProps<AppRoutes>;

type TaskProps = {
  id: string;
  title: string;
  isDone: boolean;
};

const Home: React.FC<HomeProps> = ({navigation}) => {
  const [taskList, setTaskList] = useState<TaskProps[]>();

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
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
      // do something
    });
    return unsubscribe;
  }, [navigation]);

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

  const handleNavigateToCreateNewTask = () => {
    navigation.navigate('Task');
  };

  return (
    <SafeAreaView style={styles.flex}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Button
              label="+"
              onPress={handleNavigateToCreateNewTask}
              fontWeight="bold"
              fontSize={16}
            />
          </View>
          <ScrollView>
            {taskList?.map(taskItem => {
              const {id, title, isDone} = taskItem;
              return (
                <TaskItem
                  key={id}
                  label={title}
                  isDone={isDone}
                  onPress={() => handleOpenTask(taskItem)}
                />
              );
            })}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Home;

// AXIOS client HTTP

// POST DELETE PUT GET PATCH

// Context API

// CSS in JS Styled Components

// React Native Navigation

// Formik e YUP

// Criação de HOOKS personalizados
