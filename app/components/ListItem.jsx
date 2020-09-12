import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import AppText from './Form/AppText';
import GlobalCSS from '../config/globalcss';
import RenderSwitch from './Form/RenderSwitch';
import { connect } from 'react-redux';
import { darkColorTheme, lightColorTheme } from '../config/theme';

const ListItem = ({
  left,
  leftComponent,
  right,
  rightComponent,
  theme,
  showBorder = false,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor:
            showBorder && theme
              ? darkColorTheme.lightWhite
              : lightColorTheme.blackColor,
          borderBottomWidth: showBorder ? 0.2 : 0,
        },
      ]}
    >
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
const mapStateToProps = state => {
  return {
    theme: state.themeReducer.theme,
  };
};
export default connect(mapStateToProps)(ListItem);
