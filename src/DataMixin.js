'use strict';

var { sort, filter } = require('./utils');

var containsIgnoreCase = function(a, b) {
  a = (a + '').toLowerCase().trim();
  b = (b + '').toLowerCase().trim();
  return b.indexOf(a) >= 0;
};

module.exports = {

  getInitialState() {
    return {
      sortBy: this.props.initialSortBy,
      filterValues: {
        globalSearch: ""
      },
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

  onSort(sortBy) {
    this.setState({
      sortBy: sortBy
    });
  },

  onFilter(filterName, filterValue) {
    var {filterValues} = this.state;
    filterValues[filterName] = filterValue;

    this.setState({
      filterValues: filterValues,
      currentPage: 0
    });
  },

  // Pagination
  buildPage() {
    var {filterValues, sortBy, currentPage, pageLength} = this.state;
    var {filters} = this.props;
    var start = pageLength * currentPage;

    var pageData = filter(filters, filterValues, this.props.initialData);
    pageData = sort(sortBy, pageData);
    pageData = pageData.slice(start, start + pageLength);

    return {
      data: pageData,
      currentPage: currentPage,
      totalPages: Math.ceil(pageData.length / pageLength)
    };
  },

  onChangePage(pageNumber) {
    this.setState({ currentPage: pageNumber });
  },

  onPageLengthChange(value) {
    var newPageLength = +value;
    var {currentPage, pageLength} = this.state;
    var newPage = Math.floor((currentPage * pageLength) / newPageLength);

    this.setState({
      pageLength: newPageLength,
      currentPage: newPage
    });
  }

};
