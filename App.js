import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import ImageScreen from './screens/ImageScreen';
import { changeBarColors } from 'react-native-immersive-bars';

const Stack = createStackNavigator();

const isDarkMode = false;

const App = () => {
  if (Platform.OS === 'android') {
    React.useEffect(() => {
      changeBarColors(isDarkMode, '#50000000', 'transparent');
    }, [isDarkMode]);
  }
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
        <Stack.Screen name='ImageScreen' component={ImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;