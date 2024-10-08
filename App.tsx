import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { globalStyles } from './styles/styles';
import AddTaskScreen from './screens/AddTaskScreen';
import TaskListScreen from './screens/TaskListScreen';
import EditTaskScreen from './screens/EditTaskScreen';
import { StackParamList } from './types';



const Stack = createStackNavigator<StackParamList>();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* screens  */}
        <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'My Tasks' }} /> 
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Create New Tasks' }} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ title: 'Edit Tasks' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
