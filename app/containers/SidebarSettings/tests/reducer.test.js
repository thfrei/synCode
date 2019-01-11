import { fromJS } from 'immutable';
import sidebarSettingsReducer from '../reducer';

describe('sidebarSettingsReducer', () => {
  it('returns the initial state', () => {
    expect(sidebarSettingsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
