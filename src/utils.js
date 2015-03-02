'use strict';

/**
 * Determines if at least one element in the object matches a truth test.
 *
 * @param {function(val, key)} pred Predicate function.
 * @param {object|array} obj
 * @return {boolean}
 */
function some(pred, obj) {
  for (var key in obj) {
    if (pred(obj[key], key) === true) {
      return true;
    }
  }
  return false;
}

/**
 * Creates a compare function with a property to sort on.
 *
 * @param {string} prop Property to sort.
 * @return {function(object, object)} Compare function.
 */
var sortByFunc =
    (prop) =>
        (a, b) => a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0;

/**
 * @param {object} sortBy Object containing `prop` and `order`.
 * @param {array} data Array to sort.
 * @return {array} Sorted array.
 */
function sort(sortBy, data) {
  var sortedData = data.sort(sortByFunc(sortBy.prop));
  if (sortBy.order === 'descending') {
    sortedData.reverse();
  }
  return sortedData;
}

/**
 * @param {!object} filters
 * @param {!array} data
 * @return {function(*, string)} Function to be executed for each entry in data.
 */
function filterPass(filters, data) {
  return function(filterValue, key) {
    var filterDef = filters[key];
    var partial = filterDef.filter.bind(null, filterValue);
    if (!filterDef.prop) {
      // Filter is for all properties
      return some(each => partial(each), data);
    } else {
      // Filter is for one property
      return partial(data[filterDef.prop]);
    }
  };
}

/**
 * Example of filter and filterValues.
 * filters = { globalSearch: { filter: containsIgnoreCase } }
 * filterValues = { globalSearch: 'filter value' }
 *
 * @param {object} filters Definition of the filters.
 * @param {object} filterValues Values of the filters.
 * @param {array} data Array to filter.
 * @return {array} Filtered array.
 */
function filter(filters, filterValues, data) {
  var filterFunc = filterPass.bind(null, filters);
  return data.filter(each => some(filterFunc(each), filterValues));
}

module.exports = { filter, filterPass, sort, sortByFunc, some };
