/* eslint-env browser */
import React from 'react';
import { Provider } from 'react-redux';

require('./scss/app.scss');


export class App extends React.Component {

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <div>

        </div>
      </Provider>
    );
  }
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
  socket: React.PropTypes.object.isRequired
};

export default App;
