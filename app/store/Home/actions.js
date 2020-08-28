const { THEME_STYLE } = require('./types');

const changeTheme = updatedTheme => {
  return {
    type: THEME_STYLE,
    payload: updatedTheme,
  };
};

export { changeTheme };
