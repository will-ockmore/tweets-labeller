import React from 'react';
import { connect } from 'react-redux';
import { List, fromJS } from 'immutable';

import { addTweet } from '../../actions/actions';

import TweetList from '../presentational/TweetList';


export class TweetsContainer extends React.PureComponent {

  componentDidMount() {
    const { socket, onTweet } = this.props;

    // store tweets in the store
    socket.on('tweet', t => onTweet(fromJS(t)));
  }

  render() {
    const { tweets } = this.props;

    return <TweetList tweets={tweets} />;
  }
}

TweetsContainer.propTypes = {
  socket: React.PropTypes.object.isRequired,
  tweets: React.PropTypes.instanceOf(List).isRequired,
  onTweet: React.PropTypes.func.isRequired,
};

export function mapStateToProps(state) {
  return {
    tweets: state.tweets,
  };
}

export default connect(
  mapStateToProps,
  {
    onTweet: addTweet,
  },
)(TweetsContainer);
