import React, { useEffect, useState } from 'react';
import { lightColorTheme, darkColorTheme } from '../../config/theme';
import GlobalCSS from '../../config/globalcss';
import { View, Button } from 'react-native';
import { Switch } from 'react-native-switch';

const RenderSwitch = () => {
  return (
    <Switch
      value={true}
      onValueChange={val => console.log(val)}
      disabled={false}
      activeText={'Light'}
      inActiveText={'Dark'}
      circleSize={30}
      barHeight={1}
      circleBorderWidth={3}
      backgroundActive={'green'}
      backgroundInactive={'gray'}
      circleActiveColor={'#30a566'}
      circleInActiveColor={'#000000'}
      changeValueImmediately={true}
    />
  );
};
export default RenderSwitch;
