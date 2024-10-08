import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AddTaskScreen from './screens/AddTaskScreen';
import TaskListScreen from './screens/TaskListScreen';
import EditTaskScreen from './screens/EditTaskScreen';
import { StackParamList } from './types';
import * as Font from 'expo-font'; 

const Stack = createStackNavigator<StackParamList>();

//load fonts
const loadFonts = async () => {
  await Font.loadAsync({
    'PlayfairDisplay-Regular': require('./assets/fonts/static/PlayfairDisplay-Regular.ttf'), 
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false); 

  useEffect(() => {
    const loadResources = async () => {
      await loadFonts(); 
      setFontsLoaded(true);
    };

    loadResources();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Home">
        {/* screens  */}
        <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'My Tasks' }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Create New Tasks' }} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ title: 'Edit Tasks' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
