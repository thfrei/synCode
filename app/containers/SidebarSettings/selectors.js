import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sidebarSettings state domain
 */

const selectSidebarSettingsDomain = state =>
  state.get('sidebarSettings', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SidebarSettings
 */

const makeSelectSidebarSettings = () =>
  createSelector(selectSidebarSettingsDomain, substate => substate.toJS());

export default makeSelectSidebarSettings;
export { selectSidebarSettingsDomain };
