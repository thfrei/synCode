import { fromJS } from 'immutable';
import statusReducer from '../reducer';

describe('statusReducer', () => {
  it('returns the initial state', () => {
    expect(statusReducer(undefined, {})).toEqual(fromJS({}));
  });
});
