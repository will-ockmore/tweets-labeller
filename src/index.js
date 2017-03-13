/* eslint-disable global-require */
/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import rootReducer from './reducers/reducers';


const store = createStore(rootReducer);

const render = () => {
  const App = require('./App').default;

  ReactDOM.render(
    <App
      store={store}
    />,
    document.getElementById('app')
  );
};

if (module.hot) {
  // Support hot reloading of components
  module.hot.accept('./App', () => {
    render();
  });
}

render();

