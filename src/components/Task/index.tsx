import React from 'react';
import {GestureResponderEvent, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

type TaskProps = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
};

const Task: React.FC<TaskProps> = ({label, onPress}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Task;
