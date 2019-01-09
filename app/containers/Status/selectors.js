import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the status state domain
 */

const selectStatusDomain = state => state.get('status', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Status
 */

const makeSelectStatus = () =>
  createSelector(selectStatusDomain, substate => substate.toJS());

export default makeSelectStatus;
export { selectStatusDomain };
