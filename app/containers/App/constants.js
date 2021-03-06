/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const PLAY = 'synCode/App/PLAY';
export const TOGGLE_PLAY = 'synCode/App/TOGGLE_PLAY';
export const SET_TIME = 'synCode/App/SET_TIME';
export const MASTER_TIME_MINUS = 'synCode/App/MASTER_TIME_MINUS';
export const SYNC_SET_AND_MASTER_TIME = 'synCode/App/SYNC_SET_AND_MASTER_TIME';
export const SET = 'synCode/App/SET';
export const ADD = 'synCode/App/ADD';
export const UPDATE_TEXT = 'synCode/App/UPDATE_TEXT';
