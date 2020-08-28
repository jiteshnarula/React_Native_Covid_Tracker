import React from 'react';
import { THEME_STYLE } from './types';

const initial_state = {
  theme: false,
};

const themeReducer = (state = initial_state, action) => {
  switch (action.type) {
    case THEME_STYLE:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export default themeReducer;
