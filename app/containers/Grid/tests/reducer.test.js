import { fromJS } from 'immutable';
import gridReducer from '../reducer';

describe('gridReducer', () => {
  it('returns the initial state', () => {
    expect(gridReducer(undefined, {})).toEqual(fromJS({}));
  });
});
