import { fromJS } from 'immutable';
import itemSettingsReducer from '../reducer';

describe('itemSettingsReducer', () => {
  it('returns the initial state', () => {
    expect(itemSettingsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
