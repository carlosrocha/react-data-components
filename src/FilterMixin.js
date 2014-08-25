var utils = require('./utils');
var findWhere = utils.findWhere;
var containsIgnoreCase = utils.containsIgnoreCase;
var some = utils.some;

var contains = function(arr, val) {
  return arr.indexOf(val) >= 0;
};

var FilterMixin = {
  getInitialState: function() {
    return {
      filterBy: {}
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

  checkFilter: function(prop, filterValue, value) {
    var filterDef = findWhere(this.props.filters, { prop: prop });
    return filterDef.filter(filterValue, value);
  },

  /**
   * @param {Object} filterBy the object with the filtering definitions
   * @return {Array} the filtered array of data
   */
  applyFilters: function(filterBy) {
    var data = this.props.initialData;
    return data.filter(function(each) {
      for (var prop in filterBy) {
        if (!this.checkFilter(prop, filterBy[prop], each[prop])) {
          return false;
        }
      }
      return true;
    }, this);
  },

  /**
   * Global text search.
   * @param {Event} e the change event
   * @return {void}
   */
  onFilterGlobal: function(e) {
    var text = e.target.value;
    var data = this.props.initialData.filter(some(containsIgnoreCase(text)));

    this.setState({
      data: data,
      globalSearch: text
    });
  },

  onFilter: function(prop, e) {
    var filterBy = this.state.filterBy;
    var filterValue = e.target.value;
    filterBy[prop] = filterValue;

    var newData = this.applyFilters(filterBy);

    this.setState({
      data: newData,
      filterBy: filterBy,
      // TODO: mixins are not supposed to know about each other
      currentPage: 0
    });
  }
};

module.exports = FilterMixin;
