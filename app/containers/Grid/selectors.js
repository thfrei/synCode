import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the grid state domain
 */

const selectGridDomain = state => state.get('grid', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Grid
 */

const makeSelectGrid = () =>
  createSelector(selectGridDomain, substate => substate.toJS());

export default makeSelectGrid;
export { selectGridDomain };
