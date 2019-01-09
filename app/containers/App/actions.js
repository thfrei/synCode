import { PLAY, SET_TIME, TOGGLE_PLAY, SET, SYNC_SET_AND_MASTER_TIME, MASTER_TIME_MINUS } from "./constants";

export function play(playing) {
  return {
    type: PLAY,
    playing,
  };
}
export function togglePlay() {
  return {
    type: TOGGLE_PLAY,
  };
}
export function setTime(time) {
  return {
    type: SET_TIME,
    time,
  };
}
export function masterTimeMinus(time) {
  return {
    type: MASTER_TIME_MINUS,
    time,
  };
}
export function set(property, value) {
  return {
    type: SET,
    property,
    value,
  };
}
export function syncSetAndMasterTime() {
  return {
    type: SYNC_SET_AND_MASTER_TIME,
  };
}