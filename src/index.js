/* eslint-disable global-require */
/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';


const render = () => {
  const App = require('./components/App').default;

  ReactDOM.render(
    <App
      store={store}
    />,
    document.getElementById('app')
  );
};

if (module.hot) {
  // Support hot reloading of components
  module.hot.accept('./components/App', () => {
    render();
  });
}

render();

