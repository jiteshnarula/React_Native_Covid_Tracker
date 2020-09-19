import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Others from '../screens/Others/Others';
import { header } from '../config/commonstyles';
import { connect } from 'react-redux';
import OfficialData from '../screens/OfficialData/OfficialData';
import routes from './routes';
import Home from '../screens/Home/Home';
import SplashScreen from '../screens/Splash/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from './navigationTheme';
import { darkColorTheme, lightColorTheme } from '../config/theme';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

const SplashScreenNavigator = ({ theme }) => {
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
      <Stack.Navigator>
        <Stack.Screen
          name={routes.SplashScreen}
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
  };
};
export default connect(mapStateToProps)(SplashScreenNavigator);
