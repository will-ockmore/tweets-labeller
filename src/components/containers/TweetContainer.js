import React from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import Linkify from 'react-linkify';

import { PENDING, SUCCESSFUL } from '../../constants/responseStates';
import { FOR, AGAINST, UNKNOWN } from '../../constants/sentimentLabels';
import { getTweets, updateTweet } from '../../actions/actions';


export class TweetContainer extends React.PureComponent {

  componentDidMount() {
    this.props.getTweets();
  }

  componentDidUpdate() {
    const { tweets, response } = this.props;

    if (tweets.size < 5 && !(response === PENDING)) {
      this.props.getTweets();
    }
  }

  render() {
    const { currentTweet, response, update } = this.props;

    return (
      <div>
        <div>{(!response || response === PENDING) && 'Loading...'}</div>
        <h1 className="text-center tweet-display">
          <Linkify>{currentTweet && currentTweet.get('text')}</Linkify>
        </h1>
        {response === SUCCESSFUL &&
          <div>
            <button
              className="btn btn-primary btn-lg center-block sentiment-btn"
              onClick={() => update(currentTweet.get('_id'), FOR)}
            >
              For Trump
            </button>
            <button
              className="btn btn-primary btn-lg center-block sentiment-btn"
              onClick={() => update(currentTweet.get('_id'), AGAINST)}
            >
              Against Trump
            </button>
            <button
              className="btn btn-primary btn-lg center-block sentiment-btn"
              onClick={() => update(currentTweet.get('_id'), UNKNOWN)}
            >
              Unknown
            </button>
          </div>
        }
      </div>
    );
  }
}

TweetContainer.propTypes = {
  tweets: React.PropTypes.instanceOf(List),
  currentTweet: React.PropTypes.instanceOf(Map),
  getTweets: React.PropTypes.func,
  update: React.PropTypes.func,
  response: React.PropTypes.string,
};

export function mapStateToProps(state) {
  return {
    tweets: state.tweets.get('results'),
    currentTweet: state.tweets.get('results').first() || Map(),
    response: state.tweets.get('response'),
  };
}

export default connect(
  mapStateToProps,
  {
    getTweets,
    update: updateTweet,
  }
)(TweetContainer);
