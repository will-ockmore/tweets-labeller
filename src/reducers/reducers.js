import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

import * as actions from '../actions/actions';

export function tweets(state = fromJS([]), action) {
  switch (action.type) {
    case actions.ADD_TWEET:
      return state
        .unshift(action.payload.tweet)
        .slice(0, 7);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  tweets,
});

export default rootReducer;
