import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import AppText from './Form/AppText';
import GlobalCSS from '../config/globalcss';
import RenderSwitch from './Form/RenderSwitch';

const ListItem = ({ left, leftComponent, right, rightComponent }) => {
  return (
    <View style={styles.container}>
      {left ? leftComponent : null}
      {right ? rightComponent : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
  },
});
export default ListItem;
