import { combineReducers } from 'redux';
import themeReducer from './Home/reducers';

export default combineReducers({
  themeReducer: themeReducer,
});
