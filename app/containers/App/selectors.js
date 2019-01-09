/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

export const selectGlobalPlaying = state => state.getIn(['global', 'playing']);
export const selectGlobalSetTime = state => state.getIn(['global', 'setTime']);
export const selectGlobalMasterTime = state => state.getIn(['global', 'masterTime']);

const selectRouter = state => state.get('router');

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );
