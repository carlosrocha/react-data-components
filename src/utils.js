import {orderBy, some} from 'lodash';
import type {SortBy, AppData} from './types';

export function sort({prop, order}: SortBy, data: AppData) {
  return orderBy(data, prop, order === 'descending' ? 'desc' : 'asc');
}

export function filter(filters, filterValues, data) {
  const filterAndVals = {};
  for (let key in filterValues) {
    filterAndVals[key] = {
      value: filterValues[key],
      filter: filters[key].filter,
    };
  }

  return data.filter(
    row => some(
      filterAndVals,
      ({filter, value, prop}) => {
        if (!prop) {
          return some(row, filter.bind(null, value));
        } else {
          return filter(value, row[key]);
        }
      }
    )
  );
}

export function containsIgnoreCase(a, b) {
  a = String(a).toLowerCase().trim();
  b = String(b).toLowerCase().trim();
  return b.indexOf(a) >= 0;
}
