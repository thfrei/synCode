import { PLAY } from "./constants";

export function play(playing) {
  return {
    type: PLAY,
    playing,
  };
}