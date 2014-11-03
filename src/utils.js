/**
 * Compares two values as strings, case insensitive.
 *
 * @param {!*} a
 * @param {!*} b
 * @return {boolean}
 */
exports.containsIgnoreCase = function(a, b) {
  a = (a + '').toLowerCase().trim();
  b = (b + '').toLowerCase().trim();
  return b.indexOf(a) >= 0;
};

/**
 * @param {!array} arr
 * @param {?object} val
 * @return {boolean} true if the val is contained in the array
 */
exports.contains = (arr, val) => arr.indexOf(val) >= 0;

/**
 * Determines if at least one element in the object matches a truth test.
 *
 * @param {function(val, key)} pred Predicate function.
 * @param {object|array} obj
 * @return {boolean}
 */
var some = exports.some = function(pred, obj) {
  for (var key in obj) {
    if (pred(obj[key], key) === true) {
      return true;
    }
  }
  return false;
};

/**
 * @param {*} obj Object to check.
 * @return {boolean} True if the object is a function, false otherwise.
 */
exports.isFunc = (obj) => typeof obj === 'function';

/**
 * Creates a function to get keys of objects.
 *
 * @param {array} keys Array of keys to get.
 * @return {function(array)} takes the data to get the keys from.
 */
exports.keyGetter = (keys) => (data) => keys.map((key) => data[key]);

/**
 * @param {*} val
 * @return {boolean} true if the value is empty.
 */
exports.isEmpty = (val) => val === undefined || val === null || val === '';

/**
 * Creates a compare function with a property to sort on.
 *
 * @param {string} prop Property to sort.
 * @return {function(object, object)} Compare function.
 */
var sortByFunc = exports.sortByFunc =
    (prop) =>
        (a, b) => a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0;

/**
 * @param {object} sortBy Object containing `prop` and `order`.
 * @param {array} data Array to sort.
 * @return {array} Sorted array.
 */
function sort(sortBy, data) {
  var sortedData = data.sort(sortByFunc(sortBy.prop));
  if (sortBy.order === 'desc') {
    sortedData.reverse();
  }
  return sortedData;
}

exports.sort = sort;

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

exports.filterPass = filterPass;

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

exports.filter = filter;
