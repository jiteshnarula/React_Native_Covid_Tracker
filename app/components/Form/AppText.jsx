import React from 'react';
import { Text, StyleSheet } from 'react-native';

import GlobalCSS from '../../config/globalcss';

const AppText = props => {
  const { title, style } = props;

  return (
    <Text style={style} {...props}>
      {title}
    </Text>
  );
};

export default AppText;
