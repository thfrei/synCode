/*
 *
 * Grid actions
 *
 */

import { DEFAULT_ACTION, UPDATE_OFFSET, UPDATE_ITEM, LOAD_STATE, SAVE_STATE, MUTE_ITEM } from './constants';

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

export function updateItem(id, property, value) {
  return {
    type: UPDATE_ITEM,
    id,
    property,
    value,
  };
}

export function loadState() {
  return {
    type: LOAD_STATE,
  }
}

export function saveState() {
  return {
    type: SAVE_STATE,
  }
}