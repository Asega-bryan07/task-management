import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, Text, TextInput } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';
import { globalStyles } from '../styles/styles';
import { format, isValid, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library

interface Task {
  id: string;
  name: string;
  dueDate: string;
  status: string;
}

export default function TaskListScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quote, setQuote] = useState<{ q: string; a: string } | null>(null);
  const navigation = useNavigation();

  // fetch tasks from AsyncStorage
  const fetchTasks = async () => {
    const storedTasks = await AsyncStorage.getItem('tasks');
    if (storedTasks) {
      const parsedTasks: Task[] = JSON.parse(storedTasks);
      parsedTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      setTasks(parsedTasks);
      setFilteredTasks(parsedTasks); // Initialize filtered tasks
    } else {
      console.log('No tasks found!');
    }
  };

  useEffect(() => {
    fetchTasks();

    const fetchQuote = async () => {
      try {
        const response = await fetch('https://zenquotes.io/api/random');
        const data = await response.json();
        setQuote(data[0]);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
  }, []);

  // Listen for screen focus to refresh tasks
  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

  const handleDelete = async (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); // Update filtered tasks
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

  // Handle search query change
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = tasks.filter(task => 
      task.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(filtered);
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

      {/* Search Bar with Icon */}
      <View style={globalStyles.searchBar}>
        <Icon name="search" size={20} style={globalStyles.searchIcon} display="none" />
        <TextInput
          style={globalStyles.searchBar}
          placeholder="Search tasks"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredTasks}
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
