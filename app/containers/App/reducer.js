/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import { PLAY, SET_TIME, TOGGLE_PLAY } from './constants';

// The initial state of the App
const initialState = fromJS({
  playing: false,
  volume: 70,
  playbackRate: 1,
  mainPlayer: 1,
  setTime: 0,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY:
      return state.set('playing', !!action.playing);
    case TOGGLE_PLAY:
      return state.set('playing', !state.get('playing'));
    case SET_TIME:
      return state.set('setTime', action.time);
    default:
      return state;
  }
}

export default appReducer;
