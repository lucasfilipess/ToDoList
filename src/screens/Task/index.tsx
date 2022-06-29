import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppRoutes} from '../../routes';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import {styles} from './styles';

type TaskProps = NativeStackScreenProps<AppRoutes>;

const Task: React.FC<TaskProps> = ({navigation}) => {
  const [newTask, setNewTask] = useState('');

  const handleSaveTask = async () => {
    try {
      const buttons = [
        {text: 'cancelar'},
        {
          text: 'ir para home',
          onPress: () => navigation.navigate('Home'),
        },
      ];

      const storedTaskList = await AsyncStorage.getItem('taskList');
      const newTaskList = [
        ...(JSON.parse(storedTaskList || '') || []),
        {id: uuid.v4() as string, title: newTask, isDone: false},
      ];
      await AsyncStorage.setItem('taskList', JSON.stringify(newTaskList));
      setNewTask('');
      Alert.alert(
        'Task criada com sucesso!',
        'Sua nova task foi criada com sucesso, vá para tela home para visualiza-la.',
        buttons,
      );
    } catch (error) {
      Alert.alert(error as string);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput value={newTask} onChangeText={setNewTask} width={260} />
        <Button label="Salvar" onPress={handleSaveTask} disabled={!newTask} />
      </View>
    </View>
  );
};

export default Task;
