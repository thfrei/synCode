import { PLAY, SET_TIME, TOGGLE_PLAY } from "./constants";

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