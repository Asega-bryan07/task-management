import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, RouteProp } from '@react-navigation/native';

import { StackParamList } from '../types';  
import { globalStyles } from '../styles/styles';


type EditTaskScreenRouteProp = RouteProp<StackParamList, 'EditTask'>;

interface EditTaskScreenProps {
  route: EditTaskScreenRouteProp;
}

export default function EditTaskScreen({ route }: EditTaskScreenProps) {
  const { task } = route.params;
  const [name, setName] = useState(task.name);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [status, setStatus] = useState(task.status);
  const navigation = useNavigation();

  useEffect(() => {
    setName(task.name);
    setDueDate(task.dueDate);
    setStatus(task.status);
  }, [task]);

  const handleUpdateTask = async () => {
    if (!name) {
      Alert.alert('Error', 'Task name cannot be empty!');
      return;
    }

    const updatedTask = { ...task, name, dueDate, status };
    const storedTasks = await AsyncStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];

    const updatedTasks = tasks.map((t: any) => (t.id === task.id ? updatedTask : t));
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

    navigation.navigate('MyTasks');
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        placeholder="Task Name"
        value={name}
        onChangeText={setName}
        style={globalStyles.input}
      />
      <TextInput
        placeholder="Due Date"
        value={dueDate}
        onChangeText={setDueDate}
        style={globalStyles.input}
      />
      <TextInput
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
        style={globalStyles.input}
      />
      <Button title="Update Task" onPress={handleUpdateTask} />
    </View>
  );
}


