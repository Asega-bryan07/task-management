import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TaskItem from '../components/TaskItem';
import { globalStyles } from '../styles/styles';

interface Task {
  id: string;
  name: string;
  dueDate: string;
  status: string;
}

export default function TaskListScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem task={item} onDelete={handleDelete} />}
      />
      <Button title="Create New Task" onPress={() => navigation.navigate('AddNewTask')} />
    </View>
  );
}