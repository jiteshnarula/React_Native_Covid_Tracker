import { lightColorTheme, darkColorTheme } from './theme';
import GlobalCSS from './globalcss';

export const header = {
  headerStyle: {
    backgroundColor: lightColorTheme.primary,
    height: 65,
  },
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: lightColorTheme.secondary,
    ...GlobalCSS.mediumTexRegular,
  },
};
