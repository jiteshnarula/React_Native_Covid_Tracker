import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import OthersNavigator from './OthersNavigator';
import HomeNavigator from './HomeNavigator';
import SettingsNavigator from './SettingsNavigator';
import HomeRoundButton from './HomeRoundButton';
import routes from './routes';

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Others"
        component={OthersNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="ios-stats" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={({ navigation }) => ({
          tabBarButton: ({ accessibilityState, color }) => (
            <HomeRoundButton
              color={color}
              focused={accessibilityState}
              onPress={() => navigation.navigate(routes.HOME)}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="settings"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default AppNavigator;
