import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the topbar state domain
 */

const selectTopbarDomain = state => state.get('topbar', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Topbar
 */

const makeSelectTopbar = () =>
  createSelector(selectTopbarDomain, substate => substate.toJS());

export default makeSelectTopbar;
export { selectTopbarDomain };
