import { fromJS } from 'immutable';
import topbarReducer from '../reducer';

describe('topbarReducer', () => {
  it('returns the initial state', () => {
    expect(topbarReducer(undefined, {})).toEqual(fromJS({}));
  });
});
