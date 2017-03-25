/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import Linkify from 'react-linkify';
import keydown from 'react-keydown';

import { PENDING } from '../../constants/responseStates';
import KEYCODES from '../../constants/keyCodes';
import { FOR, AGAINST, UNKNOWN } from '../../constants/sentimentLabels';
import { getTweets, updateTweet } from '../../actions/actions';


export class TweetContainer extends React.PureComponent {

  componentDidMount() {
    this.props.getTweets();
  }

  componentDidUpdate() {
    const { tweets, response, keydown } = this.props;

    if (tweets.size < 5 && !(response === PENDING)) {
      this.props.getTweets();
    }

    if (keydown.event) {
      this.onKeyDown(keydown.event);
    }
  }

  onKeyDown(e) {
    const { update, currentTweet } = this.props;

    const tweetId = currentTweet.get('_id');

    switch (e.keyCode) {
      case KEYCODES.j:
        return update(tweetId, FOR);

      case KEYCODES.k:
        return update(tweetId, AGAINST);

      case KEYCODES.l:
        return update(tweetId, UNKNOWN);

      default:
        return null;
    }
  }

  render() {
    const {
      currentTweet,
      response,
      update,
      processedCount
    } = this.props;

    const tweetId = currentTweet.get('_id');

    return (
      <div className="tweets-container">

        <span>{(!response || response === PENDING) ? 'Loading...' : 'Ready for labelling'}</span>
        <span className="pull-right">Tweets processed: {processedCount}</span>

        <h3 className="text-center tweet-display">
          <Linkify>{currentTweet && currentTweet.get('text')}</Linkify>
        </h3>

        <div className="tweet-buttons">
          <button
            className="btn btn-primary sentiment-btn"
            onClick={() => update(tweetId, FOR)}
          >
            For Trump
          </button>
          <button
            className="btn btn-primary sentiment-btn"
            onClick={() => update(tweetId, AGAINST)}
          >
            Against Trump
          </button>
          <button
            className="btn btn-primary sentiment-btn"
            onClick={() => update(tweetId, UNKNOWN)}
          >
            Unknown
          </button>
        </div>
      </div>
    );
  }
}

TweetContainer.propTypes = {
  tweets: React.PropTypes.instanceOf(List),
  currentTweet: React.PropTypes.instanceOf(Map),
  getTweets: React.PropTypes.func,
  processedCount: React.PropTypes.number,
  update: React.PropTypes.func,
  keydown: React.PropTypes.object,
  response: React.PropTypes.string,
};

export function mapStateToProps(state) {
  return {
    processedCount: state.processedCount,
    tweets: state.tweets.get('results'),
    currentTweet: state.tweets.get('results').first() || Map(),
    response: state.tweets.get('response'),
  };
}

export default keydown(connect(
  mapStateToProps,
  {
    getTweets,
    update: updateTweet,
  }
)(TweetContainer));
