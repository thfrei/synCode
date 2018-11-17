import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the control state domain
 */

const selectControlDomain = state => state.get('control', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Control
 */

const makeSelectControl = () =>
  createSelector(selectControlDomain, substate => substate.toJS());

export default makeSelectControl;
export { selectControlDomain };
