import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';
import { globalStyles } from '../styles/styles';
import { format, isValid, parseISO } from 'date-fns';

interface Task {
  id: string;
  name: string;
  dueDate: string;
  status: string;
}

export default function TaskListScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [quote, setQuote] = useState<{ q: string; a: string } | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        const parsedTasks: Task[] = JSON.parse(storedTasks);
        
        parsedTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        setTasks(parsedTasks);
      }
    };

    const fetchQuote = async () => {
      try {
        const response = await fetch('https://zenquotes.io/api/random');
        const data = await response.json();
        setQuote(data[0]);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchTasks();
    fetchQuote();
  }, []);

  const handleDelete = async (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const renderTaskItem = ({ item }: { item: Task }) => {
    const parsedDate = parseISO(item.dueDate);
    const formattedDate = isValid(parsedDate) ? format(parsedDate, 'MMMM do, yyyy') : 'Invalid Date';
  
    return (
      <TaskItem
        task={{
          ...item,
          dueDate: formattedDate, 
        }}
        onDelete={handleDelete}
      />
    );
  };

  return (
    <View style={globalStyles.container}>
      {/* Quote Display */}
      {quote && (
        <View style={globalStyles.quoteContainer}>
          <Text style={globalStyles.quoteText}>
            "{quote.q}" - {quote.a}
          </Text>
        </View>
      )}

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTaskItem}
      />
      <Button 
        title="Create New Task"
        onPress={() => navigation.navigate('AddTask')}
      />
    </View>
  );
}
