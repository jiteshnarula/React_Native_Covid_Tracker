import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { lightColorTheme } from '../config/theme';

const HomeRoundButton = ({ focused, onPress, color }) => {
  return (
    <View
      style={[
        styles.container,
        !focused.selected && { backgroundColor: '#8E8E8F' },
      ]}
    >
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons
          name="home-circle"
          size={40}
          color={lightColorTheme.secondary}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightColorTheme.primary,
    borderColor: 'white',
    borderWidth: 10,
    height: 70,
    width: 70,
    borderRadius: 40,
    bottom: 15,
  },
});
export default HomeRoundButton;
