import React from 'react';
import {GestureResponderEvent, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

type TaskItemProps = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  isDone?: boolean;
};

const TaskItem: React.FC<TaskItemProps> = ({
  label,
  onPress,
  isDone = false,
}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.symbol}>{isDone ? '✅' : '❌'} </Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TaskItem;
