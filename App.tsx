import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MyTasksScreen from './screens/MyTasksScreen';
import EditTaskScreen from './screens/EditTaskScreen';
import AddNewTaskScreen from './screens/AddNewTaskScreen';

const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* screens  */}
        <Stack.Screen name="MyTasks" component={MyTasksScreen} options={{ title: 'My Tasks' }} /> 
        <Stack.Screen name="AddNewTask" component={AddNewTaskScreen} options={{ title: 'Create New Tasks' }} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ title: 'Edit Tasks' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
