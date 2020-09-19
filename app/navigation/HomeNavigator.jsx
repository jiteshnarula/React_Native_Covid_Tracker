import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import { header } from '../config/commonstyles';
import { connect } from 'react-redux';
import OfficialData from '../screens/OfficialData/OfficialData';
import routes from './routes';

const Stack = createStackNavigator();

const HomeNavigator = props => {
  const { theme } = props;
  return (
    <Stack.Navigator screenOptions={header(theme)}>
      <Stack.Screen
        name={routes.OFFICIAL_DATA}
        component={OfficialData}
      />
    </Stack.Navigator>
  );
};
const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
  };
};
export default connect(mapStateToProps)(HomeNavigator);
