var {some, containsIgnoreCase} = require('./utils');

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

module.exports = {

  getInitialState() {
    return { filterValues: {} };
  },

  getDefaultProps() {
    return {
      filters: {
        globalSearch: {
          filter: containsIgnoreCase
        }
      }
    };
  },

  onFilter(prop, e) {
    var {filterValues} = this.state;
    var {initialData, filters} = this.props;
    var filterValue = e.target.value;

    if (filterValue) {
      filterValues[prop] = filterValue;
    } else {
      delete filterValues[prop];
    }

    var filterFunc = filterPass.bind(null, filters);
    var newData = initialData.filter(
      (each) => !some(filterFunc(each), filterValues)
    );

    this.setState({
      data: newData,
      filterValues: filterValues,
      currentPage: 0
    });
  }

};
