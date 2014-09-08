
exports.contains = function(arr, val) {
  return arr.indexOf(val) >= 0;
};

/**
 * Useful for binding values to an event.
 * @param {Function} func the function to execute.
 * @return {Function}
 */
exports.closure = function(func) {
  return function() {
    var args = arguments;
    return function(e) {
      func.apply(null, [e].concat(Array.prototype.slice.apply(args)));
    };
  };
};

/**
 * @param {String} a
 * @return {Boolean}
 */
exports.containsIgnoreCase = function(a, b) {
  a = (a + '').toLowerCase().trim();
  b = (b + '').toLowerCase().trim();
  return b.indexOf(a) >= 0;
};

/**
 * @param {Array} arr
 * @param {Object} obj
 * @return {Object}
 */
exports.findWhere = function(arr, obj) {
  for (var i = 0; i < arr.length; i++) {
    for (var key in obj) {
      if (arr[i][key] === obj[key]) {
        return arr[i];
      }
    }
  }
};

exports.some = function(pred, obj) {
  // TODO: support for arrays
  for (var key in obj) {
    if (pred(obj[key]) === true) {
      return true;
    }
  }
  return false;
};
