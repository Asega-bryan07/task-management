import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
      <Text>TASK: {task.name}</Text>
      <Text>DATE: {task.dueDate}</Text>
      <Text>STATUS: {task.status}</Text>
      <View style={globalStyles.buttonContainer}>
        <TouchableOpacity
          style={[globalStyles.button, globalStyles.editButton]}
          onPress={() => navigation.navigate('EditTask', { task })}
        >
          <Text style={globalStyles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.button, globalStyles.deleteButton]}
          onPress={() => onDelete(task.id)}
        >
          <Text style={globalStyles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
