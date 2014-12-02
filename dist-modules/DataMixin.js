var $__0=    require('./utils'),containsIgnoreCase=$__0.containsIgnoreCase,sort=$__0.sort,filter=$__0.filter;

module.exports = {

  getInitialState:function() {
    return {
      // Clone the initialData.
      data: this.props.initialData.slice(0),
      sortBy: this.props.initialSortBy,
      filterValues: {},
      currentPage: 0,
      pageLength: this.props.initialPageLength
    };
  },

  getDefaultProps:function() {
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

  componentWillMount:function() {
    // Do the initial sorting if specified.
    var $__0=   this.state,sortBy=$__0.sortBy,data=$__0.data;
    if (sortBy) {
      this.setState({ data: sort(sortBy, data) });
    }
  },

  onSort:function(sortBy) {
    this.setState({
      sortBy: sortBy,
      data: sort(sortBy, this.state.data)
    });
  },

  onFilter:function(filterName, filterValue) {
    var $__0=   this.state,filterValues=$__0.filterValues,sortBy=$__0.sortBy;
    var $__1=   this.props,initialData=$__1.initialData,filters=$__1.filters;

    filterValues[filterName] = filterValue;
    var newData = filter(filters, filterValues, initialData);
    newData = sort(sortBy, newData);

    this.setState({
      data: newData,
      filterValues: filterValues,
      currentPage: 0
    });
  },

  // Pagination
  buildPage:function() {
    var $__0=    this.state,data=$__0.data,currentPage=$__0.currentPage,pageLength=$__0.pageLength;
    var start = pageLength * currentPage;

    return {
      data: data.slice(start, start + pageLength),
      currentPage: currentPage,
      totalPages: Math.ceil(data.length / pageLength)
    };
  },

  onChangePage:function(pageNumber) {
    this.setState({ currentPage: pageNumber });
  },

  onPageLengthChange:function(value) {
    var newPageLength = +value;
    var $__0=   this.state,currentPage=$__0.currentPage,pageLength=$__0.pageLength;
    var newPage = Math.floor((currentPage * pageLength) / newPageLength);

    this.setState({
      pageLength: newPageLength,
      currentPage: newPage
    });
  }

};
