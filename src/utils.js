import orderBy from 'lodash/orderBy';
import some from 'lodash/some';
import type { SortBy, AppData, Value, Filters } from './types';

function allEqual(arr) {
  return new Set(arr).size == 1;
}

function isNumber(item) {
  console.log('inside isNumber-');
  console.log('item:');
  console.log(item);
  let result = /^[0-9.]+$/.test(item);
  console.log('result:');
  console.log(result);
  return /^[0-9.]+$/.test(item);
}

function isPercent(item) {
  let result = /^.*[%]$/.test(item);
  return result;
}

function percentToNumber(item) {
  let numString = item.replace('%', '');
  let this_number = parseFloat(numString);
  return this_number;
}

function makeLowerCase(item) {
  return item.toLowerCase();
}

function equivalency_closure_generator(equivalencyCallback) {
  console.log('inside equivalency_closure_generator-');
  return function(data, key) {
    let values = _.map(data, key);
    let results = [];
    for (let value of values) {
      if (value == 'N/A') {
        continue;
      }
      results.push(equivalencyCallback(value));
    }
    console.log('results:');
    console.log(results);
    for (let item of results) {
      if (item == false) {
        return false;
      }
    }
    return allEqual(results);
  };
}

let are_all_numbers = equivalency_closure_generator(isNumber);
let are_all_percents = equivalency_closure_generator(isPercent);

export function sort({ prop, order }: SortBy, data: AppData) {
  let all_are_numbers = are_all_numbers(data, prop);
  let all_are_percents = are_all_percents(data, prop);
  let orderingFlag = order === 'descending' ? 'desc' : 'asc';
  console.log('inside sort-');
  console.log('prop:');
  console.log(prop);
  console.log('data:');
  console.log(data);
  console.log('orderingFlag:');
  console.log(orderingFlag);
  console.log('all_are_numbers:');
  console.log(all_are_numbers);
  console.log('all_are_percents:');
  console.log(all_are_percents);

  console.log('\n\nwtffffffffffff\n\n');

  if (all_are_numbers) {
    console.log('using the all_are_numbers orderBy');
    var orderByResults = orderBy(
      data,
      item => parseFloat(item[prop]),
      orderingFlag,
    );
  } else if (all_are_percents) {
    console.log('using the all_are_percents orderBy');
    var orderByResults = orderBy(
      data,
      item => percentToNumber(item[prop]),
      orderingFlag,
    );
  } else {
    console.log('using the default orderBy');
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
