import React from 'react';
import { List, Map } from 'immutable';

export const Tweet = ({ tweet }) =>
  <div className="card">
    <a
      target="_blank"
      rel="noopener noreferrer"
      style={{ 'target-new': 'tab' }}
      href={`https://twitter.com/${tweet.getIn(['user', 'screen_name'])}/status/${tweet.get('id_str')}`}
    >
      <div>
        <h4>{tweet.getIn(['user', 'name'])}:&nbsp;</h4>
        <span>{tweet.get('text')}</span>
      </div>
    </a>
  </div>;

Tweet.propTypes = {
  tweet: React.PropTypes.instanceOf(Map).isRequired,
};

export const TweetList = ({ tweets }) =>
  <CSSTransitionGroup
    className="card-container"
    transitionName="card-anim"
    transitionEnterTimeout={500}
    transitionLeaveTimeout={700}
  >
    {tweets.map(tweet =>
      <Tweet
        key={tweet.get('id_str')}
        tweet={tweet}
      />
    )}
  </CSSTransitionGroup>;

TweetList.propTypes = {
  tweets: React.PropTypes.instanceOf(List).isRequired,
};

export default TweetList;
