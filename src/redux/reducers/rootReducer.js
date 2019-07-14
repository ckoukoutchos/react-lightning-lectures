import { combineReducers } from 'redux';
import userReducer from './userReducer';

/*
  Combines multiple seperate reducers into one. Here we have only one (so it's unnecessary), but allows for code spliting, so as your app grows you don't end up with a monolith.
*/
export default combineReducers({ users: userReducer });