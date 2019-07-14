import { all } from 'redux-saga/effects';
import userSaga from './userSaga';

/*
  Combines all sagas into one. Here we have only one (so it's unnecessary), but allows for code spliting, so as your app grows you don't end up with a monolith.
*/

// Middleware listening for all actions being dispatched
export default function* rootSage() {
  yield all([
    userSaga()
  ]);
}