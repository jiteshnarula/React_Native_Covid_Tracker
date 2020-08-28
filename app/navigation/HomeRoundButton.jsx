import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { lightColorTheme, darkColorTheme } from '../config/theme';

const HomeRoundButton = ({ focused, onPress, color, theme }) => {
  return (
    <View
      style={[
        styles.container,
        !focused.selected
          ? { backgroundColor: '#8E8E8F' }
          : theme
          ? { backgroundColor: darkColorTheme.primary }
          : { backgroundColor: lightColorTheme.primary },
      ]}
    >
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons
          name="home-circle"
          size={40}
          color={
            theme
              ? darkColorTheme.secondary
              : lightColorTheme.secondary
          }
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 10,
    height: 70,
    width: 70,
    borderRadius: 40,
    bottom: 20,
  },
});

const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
  };
};
export default connect(mapStateToProps)(HomeRoundButton);
