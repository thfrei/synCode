/*
 *
 * Grid actions
 *
 */

import { DEFAULT_ACTION, UPDATE_OFFSET } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateOffset(id, time) {
  return {
    type: UPDATE_OFFSET,
    id,
    time,
  };
}
