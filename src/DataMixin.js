var {some, containsIgnoreCase, sortByFunc} = require('./utils');

function sort(sortBy, data) {
  var sortedData = data.sort(sortByFunc(sortBy.prop));
  if (sortBy.order === 'desc') {
    sortedData.reverse();
  }
  return sortedData;
}

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
    return {
      sortBy: this.props.initialSortBy,
      filterValues: {},
      currentPage: 0,
      pageLength: this.props.initialPageLength
    };
  },

  getDefaultProps() {
    return {
      initialPageLength: 10,
      pageLengthOptions: [ 5, 10, 20 ],
      filters: {
        globalSearch: {
          filter: containsIgnoreCase
        }
      }
    };
  },

  componentWillMount() {
    // Do the initial sorting if specified.
    var {sortBy, data} = this.state;
    if (sortBy) {
      this.setState({ data: sort(sortBy, data) });
    }
  },

  onSort(sortBy) {
    this.setState({
      sortBy: sortBy,
      data: sort(sortBy, this.state.data)
    });
  },

  onFilter(prop, filterValue) {
    var {filterValues, sortBy} = this.state;
    var {initialData, filters} = this.props;

    if (filterValue) {
      filterValues[prop] = filterValue;
    } else {
      delete filterValues[prop];
    }

    var filterFunc = filterPass.bind(null, filters);
    var newData = initialData.filter(
      (each) => !some(filterFunc(each), filterValues)
    );

    if (sortBy) {
      newData = sort(sortBy, newData);
    }

    this.setState({
      data: newData,
      filterValues: filterValues,
      currentPage: 0
    });
  },

  // Pagination
  buildPage() {
    var {data, currentPage, pageLength} = this.state;
    var start = pageLength * currentPage;

    return {
      data: data.slice(start, start + pageLength),
      currentPage: currentPage,
      totalPages: Math.ceil(data.length / pageLength)
    };
  },

  onChangePage(pageNumber) {
    this.setState({ currentPage: pageNumber });
  },

  onPageLengthChange(value) {
    var newPageLength = +value;
    var pageNumber = this.state.currentPage;
    var dataLength = this.state.data.length;

    // Check if the new page length does not conflict with the page number
    if ((newPageLength * pageNumber) >= dataLength) {
      pageNumber = Math.ceil(dataLength / newPageLength) - 1;
    }

    this.setState({
      pageLength: newPageLength,
      currentPage: pageNumber
    });
  }

};
