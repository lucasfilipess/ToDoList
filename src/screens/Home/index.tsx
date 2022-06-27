import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import Button from '../../components/Button';
import Task from '../../components/Task';
import TextInput from '../../components/TextInput';
import {styles} from './styles';

type List = {
  id: string;
  task: string;
  isDone: boolean;
};

const Home: React.FC = () => {
  const [list, setList] = useState<List[]>();
  const [task, setTask] = useState('');

  const handleSaveTask = () => {
    // setList([...(list || []), task]);
    // setTask('');
  };

  const handleOpenTask = () => {
    // Alert.alert(taskMessage);
  };

  return (
    <SafeAreaView style={styles.flex}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <ScrollView>
            {/* {list?.map((item, index) => (
              <Task
                key={index}
                label={item}
                onPress={() => handleOpenTask(item)}
              />
            ))} */}
          </ScrollView>
          <View style={styles.wrapper}>
            <TextInput value={task} onChangeText={setTask} width={260} />
            <Button label="Salvar" onPress={handleSaveTask} disabled={!task} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Home;

// Adicionar botão dinâmico no alert para colocar como done ou voltar para to do
// Mudar a estrutura do objeto da lista
// Estilizar a task para diferenciar done de to do
