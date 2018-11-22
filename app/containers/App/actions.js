import { PLAY, SET_TIME } from "./constants";

export function play(playing) {
  return {
    type: PLAY,
    playing,
  };
}
export function setTime(time) {
  return {
    type: SET_TIME,
    time,
  };
}