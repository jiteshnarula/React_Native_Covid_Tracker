import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import GlobalCSS from '../config/globalcss';

const Screen = ({ children }) => (
  <SafeAreaView style={GlobalCSS.container}>{children}</SafeAreaView>
);

export default Screen;
