import { DefaultTheme } from '@react-navigation/native';
import { lightColorTheme, darkColorTheme } from '../config/theme';

export default {
  ...DefaultTheme,
  color: {
    primary: lightColorTheme.primary,
    background: lightColorTheme.secondary,
  },
};
