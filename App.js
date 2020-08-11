import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName='HomeScreen'
      >
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='PostScreen' component={PostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;