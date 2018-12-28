import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the itemSettings state domain
 */

const selectItemSettingsDomain = state =>
  state.get('itemSettings', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ItemSettings
 */

const makeSelectItemSettings = () =>
  createSelector(selectItemSettingsDomain, substate => substate.toJS());

export default makeSelectItemSettings;
export { selectItemSettingsDomain };
