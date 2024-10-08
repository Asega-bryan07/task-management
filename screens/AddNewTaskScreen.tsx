import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'; // generate unique task ID

import { globalStyles } from '../styles/styles';


export default function AddNewTaskScreen() {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('To Do');
  const navigation = useNavigation();

  const handleAddNewTask = async () => {
    if (!name) {
      Alert.alert('Error', 'Task name cannot be empty');
      return;
    }

    const task = { id: uuid(), name, dueDate, status };
    const storedTasks = await AsyncStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    tasks.push(task);
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    navigation.navigate('MyTasks');
  };

  return (
    <View style={globalStyles.container}>
      <TextInput placeholder="Task Name" value={name} onChangeText={setName} style={globalStyles.input} />
      <TextInput placeholder="Due Date" value={dueDate} onChangeText={setDueDate} style={globalStyles.input} />
      <Button title="Add New Task" onPress={handleAddNewTask} />
    </View>
  );
}


