import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';  
import { Platform } from 'react-native'; 
import { View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'; // generate unique task ID

import { globalStyles } from '../styles/styles';

export default function AddTaskScreen() {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);  
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [status, setStatus] = useState('To Do'); // Default status
  const navigation = useNavigation();

  const handleAddNewTask = async () => {
    if (!name) {
      Alert.alert('Error', 'Task name cannot be empty!');
      return;
    }

    const task = { id: uuid(), name, dueDate: dueDate?.toLocaleDateString() || '', status };
    const storedTasks = await AsyncStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    tasks.push(task);
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    navigation.navigate('TaskList');
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');  // Keep date picker open on iOS
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
          value={dueDate || new Date()}  
          mode="date"
          display="default"
          onChange={handleDateChange}  
        />
      )}


      <Button title="Add New Task" onPress={handleAddNewTask} />
    </View>
  );
}
