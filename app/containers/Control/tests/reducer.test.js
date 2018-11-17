import { fromJS } from 'immutable';
import controlReducer from '../reducer';

describe('controlReducer', () => {
  it('returns the initial state', () => {
    expect(controlReducer(undefined, {})).toEqual(fromJS({}));
  });
});
