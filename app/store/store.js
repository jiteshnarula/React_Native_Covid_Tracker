import { createStore } from 'redux';
import reducers from './reducers';

export const configureStore = createStore(reducers);