import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Others from '../screens/Others/Others';
import { header } from '../config/commonstyles';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

const OthersNavigator = ({ theme }) => {
  return (
    <Stack.Navigator screenOptions={header(theme)}>
      <Stack.Screen name="Others" component={Others} />
    </Stack.Navigator>
  );
};

const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
  };
};
export default connect(mapStateToProps)(OthersNavigator);
