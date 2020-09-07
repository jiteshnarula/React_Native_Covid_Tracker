import { lightColorTheme, darkColorTheme } from './theme';
import GlobalCSS from './globalcss';

export const header = theme => {
  return {
    headerStyle: {
      backgroundColor: theme
        ? darkColorTheme.primary
        : lightColorTheme.primary,
      height: 65,
    },
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: theme
        ? darkColorTheme.secondary
        : lightColorTheme.secondary,
      ...GlobalCSS.mediumTextRegular,
    },
  };
};
