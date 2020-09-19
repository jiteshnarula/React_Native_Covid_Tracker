import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import OthersNavigator from './OthersNavigator';
import HomeNavigator from './HomeNavigator';
import SettingsNavigator from './SettingsNavigator';
import HomeRoundButton from './HomeRoundButton';
import routes from './routes';
import { StatusBar } from 'react-native';
import { lightColorTheme, darkColorTheme } from '../config/theme';
import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from './navigationTheme';

const Tab = createBottomTabNavigator();
const AppNavigator = props => {
  const { theme } = props;
  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar
        backgroundColor={
          theme
            ? darkColorTheme.statusBarColor
            : lightColorTheme.statusBarColor
        }
        barStyle="light-content"
      />
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: theme
            ? darkColorTheme.primary
            : lightColorTheme.primary,
          inactiveTintColor: '#8E8E8F',
        }}
      >
        <Tab.Screen
          name={routes.UNOFFICIAL_DATA}
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
            tabBarIcon: ({ size, focused, color }) => (
              <MaterialIcons
                name="settings"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
  };
};

export default connect(mapStateToProps)(AppNavigator);
