/*
 *
 * Grid reducer
 *
 */

import { fromJS } from 'immutable';
import { VIDEO, AUDIO, EDITOR } from './constants';

export const initialState = fromJS({
  nrOfGridItems: 6,
  items: [
    gridItem(1, VIDEO, 0, 0, 8, 6),
    gridItem(2, EDITOR, 8, 0, 4, 6),
    gridItem(3, VIDEO, 0, 6, 4, 6),
    gridItem(4, VIDEO, 4, 6, 4, 6),
    gridItem(5, AUDIO, 8, 6, 4, 3),
    gridItem(6, AUDIO, 8, 9, 4, 3),
  ],
  editable: false,
});

function gridItem(id, type, x, y, w, h) {
  return {
    id, type, x, y, w, h,
    playing: false,
    fullscreen: false,
    offset: 0,
    source: '',
    static: true,
  };
}

function gridReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default gridReducer;
