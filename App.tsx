import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* screens  */}
        <Stack.Screen name="MyTasks" component={MyTasksScreen} options={{ title: 'My Tasks' }} /> 
        <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ title: 'Edit Tasks' }} />
        <Stack.Screen name="AddNewTask" component={AddNewTaskScreen} options={{ title: 'Create New Tasks' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
