import React from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';

import { PENDING } from '../../constants/responseStates';
import { getTweets } from '../../actions/actions';


export class TweetContainer extends React.PureComponent {

  componentDidMount() {
    this.props.getTweets();
  }

  componentDidUpdate() {
    const { tweets } = this.props;

    if (tweets.size < 5) {
      this.props.getTweets();
    }
  }

  render() {
    const { currentTweet, response } = this.props;

    if (!response || response === PENDING) {
      return <div>Loading...</div>;
    }

    return <h1>{currentTweet.get('text')}</h1>;
  }
}

TweetContainer.propTypes = {
  tweets: React.PropTypes.instanceOf(List),
  currentTweet: React.PropTypes.instanceOf(Map),
  getTweets: React.PropTypes.func,
  response: React.PropTypes.string,
};

export function mapStateToProps(state) {
  // console.log(state.tweets.get('results').toJS());
  return {
    tweets: state.tweets.get('results'),
    currentTweet: state.tweets.get('results').first() || Map(),
    response: state.tweets.get('response'),
  };
}

export default connect(mapStateToProps, { getTweets })(TweetContainer);
