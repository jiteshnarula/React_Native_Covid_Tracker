import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import { header } from '../config/commonstyles';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={header}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
export default HomeNavigator;
