import { combineReducers } from 'redux';
import urlReducer from './urlReducer';

export default combineReducers({
  url: urlReducer
});