import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { globalStyles } from '../styles/styles';

interface Task {
  id: string;
  name: string;
  dueDate: string;
  status: string;
}

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onDelete }: TaskItemProps) {
  const navigation = useNavigation();

  return (
    <View style={globalStyles.taskContainer}>
      <Text>{task.name}</Text>
      <Text>{task.dueDate}</Text>
      <Text>{task.status}</Text>
      <Button title="Edit" onPress={() => navigation.navigate('EditTask', { task })} />
      <Button title="Delete" onPress={() => onDelete(task.id)} />
    </View>
  );
}
