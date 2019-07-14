import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import rootSaga from './redux/sagas/rootSaga';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

// initial set up of redux store and middleware
const store = configureStore();

// starts sagas
store.runSagas(rootSaga);

ReactDOM.render(
  /*
    Provider wraps App to allow access for all nested components
    to the store object via props
  */
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

