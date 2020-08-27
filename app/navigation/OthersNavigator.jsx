import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Others from '../screens/Others/Others';
import { header } from '../config/commonstyles';

const Stack = createStackNavigator();

const OthersNavigator = () => {
  return (
    <Stack.Navigator screenOptions={header}>
      <Stack.Screen name="Others" component={Others} />
    </Stack.Navigator>
  );
};

export default OthersNavigator;
