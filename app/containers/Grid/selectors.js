import { createSelector } from 'reselect';
import Immutable from 'immutable';
import { initialState } from './reducer';
import { toString } from 'lodash';

/**
 * Direct selector to the grid state domain
 */

const selectGridDomain = state => state.get('grid', initialState);

export const selectComponentItem = (_, props) => props.item;

export const selectGridItems = createSelector(selectGridDomain, substate =>
  substate.get('items'),
);

export const selectItem = createSelector(
  [selectGridItems, selectComponentItem],
  (items, id) => items.find(item => item.get('id') === id) || Immutable.Map(),
);

export const selectLayout = createSelector(selectGridItems, items =>
  items.map(item => ({
    i: toString(item.get('id')),
    x: item.get('x'),
    y: item.get('y'),
    w: item.get('w'),
    h: item.get('h'),
    static: item.get('static'),
  })),
);
