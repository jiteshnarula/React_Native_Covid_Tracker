import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import AppText from './Form/AppText';
import GlobalCSS from '../config/globalcss';
import RenderSwitch from './Form/RenderSwitch';

const ListItem = ({
  title,
  textStyle,
  switchValue,
  setSwitchValue,
}) => {
  return (
    <View style={styles.container}>
      <AppText title={title} style={textStyle} />
      <RenderSwitch />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
});
export default ListItem;
