import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, RouteProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { Platform } from 'react-native'; 
import { StackParamList } from '../types';  
import { globalStyles } from '../styles/styles';

type EditTaskScreenRouteProp = RouteProp<StackParamList, 'EditTask'>;

interface EditTaskScreenProps {
  route: EditTaskScreenRouteProp;
}

export default function EditTaskScreen({ route }: EditTaskScreenProps) {
  const { task } = route.params;
  const [name, setName] = useState(task.name);
  const [dueDate, setDueDate] = useState<Date>(new Date(task.dueDate)); // Set the initial state
  const [status, setStatus] = useState(task.status);
  const [showDatePicker, setShowDatePicker] = useState(false);  
  const navigation = useNavigation();

  useEffect(() => {
    setName(task.name);
    
    const parsedDate = new Date(task.dueDate);
    if (!isNaN(parsedDate.getTime())) { 
      setDueDate(parsedDate);  
    } else {
      setDueDate(new Date()); 
    }

    setStatus(task.status);
  }, [task]);

  const handleUpdateTask = async () => {
    if (!name) {
      Alert.alert('Error', 'Task name cannot be empty!');
      return;
    }

    const updatedTask = { ...task, name, dueDate: dueDate.toISOString(), status };
    const storedTasks = await AsyncStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];

    const updatedTasks = tasks.map((t: any) => (t.id === task.id ? updatedTask : t));
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

    navigation.navigate('TaskList');
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios'); 
    if (selectedDate) {
      setDueDate(selectedDate); 
    }
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        placeholder="Task Name"
        value={name}
        onChangeText={setName}
        style={globalStyles.input}
      />
      
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          placeholder="Select Due Date"
          value={dueDate ? dueDate.toLocaleDateString() : ''} 
          editable={false}  
          style={globalStyles.input}
        />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dueDate}  
          mode="date"
          display="default"
          onChange={handleDateChange}  
        />
      )}

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
