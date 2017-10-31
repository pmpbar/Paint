import React from 'react';
import { render } from 'react-dom';
import { createStore /* , compose */ } from 'redux';
// import { electronEnhancer } from 'redux-electron-store';
import { Provider } from 'react-redux';
import 'base/static/css/global.css';
import { reducer, initalState } from 'base/redux/reducer';
import Routes from 'router';
import registerServiceWorker from './registerServiceWorker';

/* const enhancer = compose(
  electronEnhancer({
    dispatchProxy: a => store.dispatch(a),
  }),
); */

// const store = createStore(reducer, initalState, enhancer);
const store = createStore(reducer, initalState);

/* eslint-disable react/jsx-filename-extension */
render(
  <Provider store={store}>
    {Routes}
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
/* eslint-enable */
