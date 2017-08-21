import orderBy from 'lodash/orderBy';
import some from 'lodash/some';
import type { SortBy, AppData, Value, Filters } from './types';

function isNumber(item) {
  return /^[0-9.]+$/.test(item);
}

function isPercent(item) {
  console.log('inside isPercent-');
  console.log('item:');
  console.log(item);
  let result = /^.*[%]$/.test(item);
  console.log('result:');
  console.log(result);
  return result;
}

function percentToNumber(item) {
  let numString = item.replace('%', '');
  let this_number = parseFloat(numString);
  console.log('\ninside percentToNumber-');
  console.log('item:');
  console.log(item);
  console.log('this_number:');
  console.log(this_number);
  return this_number;
}

function are_all_percents(data, key) {
  console.log('inside are_all_percents-');
  let values = _.map(data, key);
  // console.log('values:');
  // console.log(values);
  // let result = _.every(values, isPercent);
  // console.log('result:');
  // console.log(result);
  // return result;
  let results = [];
  for (let value of values) {
    console.log('value:');
    console.log(value);
    results.append(isPercent(value));
  }
}

function are_all_numbers(data, key) {
  let values = _.map(data, key);
  return _.every(values, isNumber);
}

function isPercent(item) {
  console.log('\ninside isPercent-');
  console.log('item:');
  console.log(item);
  return /^[0-9.]+%$/.test(item);
}

export function sort({ prop, order }: SortBy, data: AppData) {
  console.log('\n\ninside sort():\n');
  console.log('data:');
  console.log(data);
  console.log('prop:');
  console.log(prop);
  // console.log('order:');
  // console.log(order);

  let all_are_numbers = are_all_numbers(data, prop);
  let all_are_percents = are_all_percents(data, prop);
  console.log('all_are_percents:');
  console.log(all_are_percents);
  let orderingFlag = order === 'descending' ? 'desc' : 'asc';

  if (all_are_numbers) {
    var orderByResults = orderBy(
      data,
      item => parseFloat(item[prop]),
      orderingFlag,
    );
  } else if (all_are_percents) {
    var orderByResults = orderBy(
      data,
      item => percentToNumber(item[prop]),
      orderingFlag,
    );
  } else {
    var orderByResults = orderBy(data, prop, orderingFlag);
  }

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
