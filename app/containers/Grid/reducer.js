/*
 *
 * Grid reducer
 *
 */

import { fromJS } from 'immutable';
import { VIDEO, AUDIO, EDITOR, CONTROL, UPDATE_OFFSET, UPDATE_ITEM } from './constants';

export const initialState = fromJS({
  nrOfGridItems: 6,
  items: [
    gridItem(1, VIDEO, 0, 0, 8, 7),
    gridItem(2, EDITOR, 8, 0, 4, 5),
    gridItem(7, CONTROL, 8, 5, 4, 2),
    gridItem(3, VIDEO, 0, 7, 4, 4),
    gridItem(4, VIDEO, 4, 7, 4, 4),
    gridItem(5, AUDIO, 8, 7, 4, 2),
    gridItem(6, AUDIO, 8, 9, 4, 2),
  ],
  editable: false,
});

function gridItem(id, type, x, y, w, h) {
  return {
    id, type, x, y, w, h,
    playing: false,
    fullscreen: false,
    offset: 0,
    source: 'http://media.w3.org/2010/05/video/movie_300.webm',
    static: true,
    muted: true,
  };
}

function gridReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_OFFSET:
      return state.update('items',
        items => items.update(
          items.findIndex(item => item.get('id') === action.id),
          specificItem => {
            console.log('spec', specificItem, specificItem.get('offset') + action.time);
            return specificItem.set('offset', specificItem.get('offset') + action.time)
          }
        )
      );
    case UPDATE_ITEM: {
      const {id, property, value} = action;
      return state.update('items',
        items => items.update(
          items.findIndex(item => item.get('id') === id),
          specificItem => {
            console.log('spec', specificItem, value);
            return specificItem.set(property, value);
          }
        )
      );
    }
    default:
      return state;
  }
}

export default gridReducer;
