import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Others from '../screens/Others/Others';
import { header } from '../config/commonstyles';
import { connect } from 'react-redux';
import OfficialData from '../screens/OfficialData/OfficialData';
import routes from './routes';

const Stack = createStackNavigator();

const OthersNavigator = ({ theme }) => {
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
export default connect(mapStateToProps)(OthersNavigator);
