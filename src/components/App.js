/* eslint-env browser */
import React from 'react';
import { Provider } from 'react-redux';

import TweetContainer from './containers/TweetContainer';

require('../scss/main.scss');


export class App extends React.Component {


  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <TweetContainer />
      </Provider>
    );
  }
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
};

export default App;
