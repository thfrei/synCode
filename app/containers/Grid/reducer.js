/*
 *
 * Grid reducer
 *
 */

import { fromJS } from 'immutable';
import { VIDEO, AUDIO, EDITOR, CONTROL, UPDATE_OFFSET, UPDATE_ITEM, SAVE_STATE, LOAD_STATE } from './constants';

export const initialState = fromJS({
  nrOfGridItems: 6,
  items: [
    gridItem(1, VIDEO, 0, 0, 8, 7, 'http://localhost:8080/V1.mp4'),
    //gridItem(6, EDITOR, 8, 0, 4, 5),
    gridItem(2, VIDEO, 0, 7, 4, 4, 'http://localhost:8080/V2.mp4'),
    gridItem(3, VIDEO, 4, 7, 4, 4, 'http://localhost:8080/V3.mp4'),
    gridItem(4, AUDIO, 8, 0, 4, 2, 'http://localhost:8080/A2.mp3'),
    gridItem(5, AUDIO, 8, 2, 4, 2, 'http://localhost:8080/A5.mp3'),
    gridItem(7, CONTROL, 8, 4, 4, 4),
  ],
  editable: false,
});

function gridItem(id, type, x, y, w, h, source) {
  return {
    id, type, x, y, w, h,
    playing: false,
    fullscreen: false,
    offset: 0,
    source: source || 'http://media.w3.org/2010/05/video/movie_300.webm',
    static: true,
    muted: true,
    master: id === 1,
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
      const { id, property, value } = action;
      return state.update('items',
        items => items.update(
          items.findIndex(item => item.get('id') === id),
          specificItem => {
            console.log('spec', specificItem.get('id'), specificItem, value);
            return specificItem.set(property, value);
          }
        )
      );
    }
    case SAVE_STATE: {
      try {
        localStorage.setItem('grid', JSON.stringify(state.toJS()));
        return state;
      } catch (err) {
        console.error(err);
        return state;
      }
    }
    case LOAD_STATE: {
      try {
        const savedState = JSON.parse(localStorage.getItem('grid'));
        console.log('load state', savedState, fromJS(savedState));
        return fromJS(savedState);
      } catch (err) {
        console.error(err);
        return state;
      }
    }
    default:
      return state;
  }
}

export default gridReducer;
