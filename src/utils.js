/**
 * @param {string} a
 * @return {boolean}
 */
exports.containsIgnoreCase = function(a, b) {
  a = (a + '').toLowerCase().trim();
  b = (b + '').toLowerCase().trim();
  return b.indexOf(a) >= 0;
};

exports.contains = (arr, val) => arr.indexOf(val) >= 0;

var some = exports.some = function(pred, obj) {
  // TODO: support for arrays
  for (var key in obj) {
    if (pred(obj[key], key) === true) {
      return true;
    }
  }
  return false;
};

/**
 * @param {object} obj the object to check.
 * @return {boolean} true if the object is a function, false otherwise.
 */
exports.isFunc = (obj) => typeof obj === 'function';

/**
 * Creates a function to get keys of objects.
 * @param {array} keys Array of keys to get.
 * @return {function} takes the data to get the keys from.
 */
exports.keyGetter = (keys) => (data) => keys.map((key) => data[key]);

/**
 * @return {boolean} true if the value is empty.
 */
exports.isEmpty = (val) => val === undefined || val === null || val === '';

/**
 * Creates a function with a property to sort on.
 * @param {string} the property
 * @return {function}
 */
var sortByFunc = exports.sortByFunc =
    (prop) =>
        (a, b) => a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0;


function sort(sortBy, data) {
  var sortedData = data.sort(sortByFunc(sortBy.prop));
  if (sortBy.order === 'desc') {
    sortedData.reverse();
  }
  return sortedData;
}

exports.sort = sort;

function filterPass(filters, row) {
  return function(filterValue, key) {
    var filterDef = filters[key];
    var partial = filterDef.filter.bind(null, filterValue);
    if (!filterDef.prop) {
      // Filter is for all properties
      return !some(each => partial(each), row);
    } else {
      // Filter is for one property
      return !partial(row[filterDef.prop]);
    }
  };
}

exports.filterPass = filterPass;

function filter(filters, filterValues, data) {
  var filterFunc = filterPass.bind(null, filters);
  var newData = data.filter(
    (each) => !some(filterFunc(each), filterValues)
  );

  return newData;
}

exports.filter = filter;
