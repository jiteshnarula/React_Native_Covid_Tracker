import React, { useEffect, useState } from 'react';
import { lightColorTheme, darkColorTheme } from '../../config/theme';
import GlobalCSS from '../../config/globalcss';
import { View, Button } from 'react-native';
import { Switch } from 'react-native-switch';
import { saveAsyncData } from '../CommonFunctions';
import { connect } from 'react-redux';
import { changeTheme } from '../../store/Home/actions';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

const RenderSwitch = props => {
  const { theme, changeTheme } = props;
  const [switchValue, setSwitchValue] = useState(false);
  const handleSwitch = () => {
    // if (switchValue) saveAsyncData('theme', 'light');
    // else saveAsyncData('theme', 'dark');
    changeTheme(!theme);
  };
  return (
    <Switch
      value={theme}
      onValueChange={val => handleSwitch()}
      disabled={false}
      activeText={'Dark'}
      inActiveText={'Light'}
      activeTextStyle={GlobalCSS.smallTextRegular}
      inactiveTextStyle={GlobalCSS.smallTextRegular}
      backgroundActive={darkColorTheme.primary}
      backgroundInactive={lightColorTheme.primary}
      circleActiveColor={darkColorTheme.statusBarColor}
      circleInActiveColor={lightColorTheme.statusBarColor}
      changeValueImmediately={true}
      useNativeDriver={false}
    />
  );
};

const mapStateToProps = state => {
  console.log('updated state', state);
  return { theme: state.themeReducer.theme };
};

export default connect(mapStateToProps, { changeTheme })(
  RenderSwitch,
);
