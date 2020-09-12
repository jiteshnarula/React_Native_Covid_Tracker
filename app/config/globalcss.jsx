import { StyleSheet, Platform, StatusBar } from 'react-native';
import { lightColorTheme } from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColorTheme.secondary,
  },
  extraSmallTextRegular: {
    fontSize: 14,
    fontFamily: 'ubuntu-regular',
  },
  extraSmallTextMedium: {
    fontSize: 14,
    fontFamily: 'ubuntu-medium',
  },
  extraSmallTextBold: {
    fontSize: 14,
    fontFamily: 'ubuntu-bold',
  },
  smallTextRegular: {
    fontSize: 16,
    fontFamily: 'ubuntu-regular',
  },
  smallTextMedium: {
    fontSize: 16,
    fontFamily: 'ubuntu-medium',
  },
  smallTextBold: {
    fontSize: 16,
    fontFamily: 'ubuntu-bold',
  },
  mediumTextRegular: {
    fontSize: 18,
    fontFamily: 'ubuntu-regular',
  },
  mediumTextMedium: {
    fontSize: 18,
    fontFamily: 'ubuntu-medium',
  },
  mediumTextBold: {
    fontSize: 18,
    fontFamily: 'ubuntu-bold',
  },
  largeTextRegular: {
    fontSize: 22,
    fontFamily: 'ubuntu-regular',
  },
  largeTextMedium: {
    fontSize: 22,
    fontFamily: 'ubuntu-medium',
  },
  largeTextBold: {
    fontSize: 22,
    fontFamily: 'ubuntu-bold',
  },
});
