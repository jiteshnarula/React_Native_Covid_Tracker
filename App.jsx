import React, { useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import { lightColorTheme, darkColorTheme } from './app/config/theme';
import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';
import configureStore from './app/store/store';
import { createStore } from 'redux';
import reducers from './app/store/reducers';

const getFonts = () => {
  return Font.loadAsync({
    'ubuntu-light': require('./app/assets/fonts/Ubuntu-Light.ttf'),
    'ubuntu-regular': require('./app/assets/fonts/Ubuntu-Regular.ttf'),
    'ubuntu-medium': require('./app/assets/fonts/Ubuntu-Medium.ttf'),
    'ubuntu-bold': require('./app/assets/fonts/Ubuntu-Bold.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (fontsLoaded) {
    return (
      <Provider store={createStore(reducers)}>
        <AppNavigator />
      </Provider>
    );
  }
  return (
    <AppLoading
      startAsync={getFonts}
      onFinish={() => setFontsLoaded(true)}
    />
  );
}

const styles = StyleSheet.create({});
