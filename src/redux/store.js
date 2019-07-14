import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer';

/*
  Creates a store for the state of the application, must be passed a reducer function
  that will be called when app state needs to be updated. applyMiddleware wraps the store's dispatch, allowing our sagas to run when certain actions are dispatched
*/

// function for inital store set up
export default function configureStore() {

  // creates middleware to connect to Redux store
  const sagaMiddleware = createSagaMiddleware();

  return {
    // creates store with reducers and sagas
    ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),

    // method to run sagas after store is created
    runSagas: sagaMiddleware.run
  }
}

