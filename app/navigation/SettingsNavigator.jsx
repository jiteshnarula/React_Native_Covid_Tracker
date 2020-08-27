import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../screens/Settings/Settings';
import { header } from '../config/commonstyles';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={header}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};
export default SettingsNavigator;
