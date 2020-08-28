import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../screens/Settings/Settings';
import { header } from '../config/commonstyles';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

const SettingsNavigator = props => {
  const { theme } = props;
  return (
    <Stack.Navigator screenOptions={header(theme)}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};
const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
  };
};
export default connect(mapStateToProps)(SettingsNavigator);
