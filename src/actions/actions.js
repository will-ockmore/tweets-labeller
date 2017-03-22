/* eslint-env browser */
import { fromJS } from 'immutable';

import { API_URL } from '../constants/settings';


export function makeAsyncActionSet(actionType) {
  return {
    REQUEST: `${actionType}_REQUEST`,
    SUCCESS: `${actionType}_SUCCESS`,
    FAILURE: `${actionType}_FAILURE`,
  };
}

export const GET_TWEETS = makeAsyncActionSet('GET_TWEETS');

export function getTweets() {
  return dispatch => {
    dispatch({ type: GET_TWEETS.REQUEST });

    fetch(API_URL)
      .then(response => response.json())
      .then(json => dispatch({ type: GET_TWEETS.SUCCESS, payload: fromJS(json) }))
      .catch(err => dispatch({ type: GET_TWEETS.FAILURE, payload: err }));
  };
}

export const POST_TWEET = makeAsyncActionSet('POST_TWEET');

export function updateTweet(id, label) {
  return dispatch => {
    dispatch({ type: POST_TWEET.REQUEST });

    const requestParams = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ sentiment_label: label }),
    };


    fetch(API_URL + id, requestParams)
      .then(response => response.json())
      .then(json => dispatch({ type: POST_TWEET.SUCCESS, payload: fromJS(json) }))
      .catch(err => dispatch({ type: POST_TWEET.FAILURE, payload: err }));
  };
}
