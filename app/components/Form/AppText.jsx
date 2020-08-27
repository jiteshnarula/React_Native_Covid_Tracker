import React from 'react';
import { Text, StyleSheet } from 'react-native';

import GlobalCSS from '../../config/globalcss';

const AppText = ({ title, style }) => (
  <Text style={style}>{title}</Text>
);

export default AppText;
