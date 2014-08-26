var utils = require('./utils');
var some = utils.some;
var contains = utils.contains;
var containsIgnoreCase = utils.containsIgnoreCase;

var FilterMixin = {
  getInitialState: function() {
    return {
      filterValues: {}
    };
  },

  getDefaultProps: function() {
    return {
      filters: {
        globalSearch: {
          filter: containsIgnoreCase
        }
      }
    };
  },

  /**
   * Returns the unique values of the specified column.
   * @param {String} prop A property name
   * @return {Array}
   */
  unique: function(prop) {
    var data = this.props.initialData;
    var result = [], currentValue;
    for (var i = 0; i < data.length; i++) {
      currentValue = data[i][prop];
      if (!contains(result, currentValue)) {
        result.push(currentValue);
      }
    }

    return result;
  },

  applyFilters: function(filterValues) {
    var data = this.props.initialData;
    var filters = this.props.filters;

    return data.filter(function(each) {
      for (var key in filterValues) {
        if (!this.filterPass(filters[key], filterValues[key], each)) {
          return false;
        }
      }
      return true;
    }, this);
  },

  filterPass: function(filterDef, filterValue, row) {
    if (!filterDef.prop) {
      // Filter is for all properties
      var filterFunction = function(each) {
        return filterDef.filter(filterValue, each);
      };
      return some(filterFunction, row);
    } else {
      // Filter is for one property
      return filterDef.filter(filterValue, row[filterDef.prop]);
    }
  },

  onFilter: function(prop, e) {
    var filterValues = this.state.filterValues;
    var filterValue = e.target.value;
    if (filterValue) {
      filterValues[prop] = filterValue;
    } else {
      delete filterValues[prop];
    }

    var newData = this.applyFilters(filterValues);

    this.setState({
      data: newData,
      filterValues: filterValues,
      // TODO: mixins are not supposed to know about each other
      currentPage: 0
    });
  }
};

module.exports = FilterMixin;
