import orderBy from 'lodash/orderBy';
import some from 'lodash/some';
import type { SortBy, AppData, Value, Filters } from './types';

export function sort({ prop, order }: SortBy, data: AppData) {
  console.log('\n\ninside sort():\n');
  console.log('data:');
  console.log(data);
  console.log('prop:');
  console.log(prop);
  console.log('order:');
  console.log(order);
  let orderByResults = orderBy(
    data,
    prop,
    order === 'descending' ? 'desc' : 'asc',
  );
  console.log('orderByResults:');
  console.log(orderByResults);
  return orderByResults;
}

export function filter(filters: Filters, filterValues, data: AppData) {
  const filterAndVals = {};
  for (let key in filterValues) {
    filterAndVals[key] = {
      value: filterValues[key],
      filter: filters[key].filter,
      prop: filters[key].prop,
    };
  }

  return data.filter(row =>
    some(
      filterAndVals,
      ({ filter, value, prop }) =>
        !prop ? some(row, filter.bind(null, value)) : filter(value, row[key]),
    ),
  );
}

export function containsIgnoreCase(a: Value, b: Value) {
  a = String(a).toLowerCase().trim();
  b = String(b).toLowerCase().trim();
  return b.indexOf(a) >= 0;
}
