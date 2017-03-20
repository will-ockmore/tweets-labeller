import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

import { PENDING, SUCCESSFUL, FAILED } from '../constants/responseStates';
import * as actions from '../actions/actions';


const initialTweetState = fromJS({
  response: null,
  errors: [],
  results: []
});

export function tweets(state = initialTweetState, action) {
  switch (action.type) {
    case actions.GET_TWEETS.REQUEST:
      return state.set('response', PENDING);

    case actions.GET_TWEETS.SUCCESS:
      return state
        .set('response', SUCCESSFUL)
        .updateIn(['results'], tweetsList => tweetsList.push(...action.payload));

    case actions.GET_TWEETS.FAILURE:
      return state
        .set('response', FAILED)
        .updateIn(['errors'], errors => errors.push(...action.payload));

    case actions.POST_TWEET.SUCCESS:
      console.log(action.payload.toJS());
      // successfully updated the currentTweet (head of the list)
      return state.shift();

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  tweets,
});

export default rootReducer;
