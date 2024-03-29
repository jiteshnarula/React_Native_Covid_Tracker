import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../screens/Settings/Settings';
import { header } from '../config/commonstyles';
import { connect } from 'react-redux';
import About from '../screens/Aboutus/About';
import { Ionicons } from '@expo/vector-icons';
import { lightColorTheme } from '../config/theme';
import { TouchableWithoutFeedback } from 'react-native';
import routes from './routes';
import OffcialData from '../screens/OfficialData/OfficialData';
import ContactHelpline from '../screens/ContactHelpline/ContactHelpline';
import TermsCondition from '../screens/TermsCondition/TermsCondition';

const Stack = createStackNavigator();

const SettingsNavigator = props => {
  const { theme, navigation } = props;
  return (
    <Stack.Navigator screenOptions={header(theme)}>
      <Stack.Screen name={routes.SETTINGS} component={Settings} />
      <Stack.Screen
        name={routes.OFFICIAL_DATA}
        component={OffcialData}
        options={{
          headerTintColor: lightColorTheme.secondary,
        }}
      />

      <Stack.Screen
        name={routes.CONTACT_HELPLINE}
        component={ContactHelpline}
        options={{
          headerTintColor: lightColorTheme.secondary,
        }}
      />
      <Stack.Screen
        name="About us"
        component={About}
        options={{
          headerTintColor: lightColorTheme.secondary,
        }}
      />
      <Stack.Screen
        name={routes.TERMS_CONDITION}
        component={TermsCondition}
        options={{
          headerTintColor: lightColorTheme.secondary,
        }}
      />
    </Stack.Navigator>
  );
};
const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
  };
};
export default connect(mapStateToProps)(SettingsNavigator);
