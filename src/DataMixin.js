var { sort, filter } = require('./utils');

var containsIgnoreCase = function(a, b) {
  a = (a + '').toLowerCase().trim();
  b = (b + '').toLowerCase().trim();
  return b.indexOf(a) >= 0;
};

function buildInitialState(props) {
  return {
    // Clone the initialData.
    data: props.initialData.slice(0),
    sortBy: props.initialSortBy,
    filterValues: {},
    currentPage: 0,
    pageLength: props.initialPageLength,
  };
}

module.exports = {

  getInitialState() {
    return buildInitialState(this.props);
  },

  getDefaultProps() {
    return {
      initialPageLength: 10,
      pageLengthOptions: [ 5, 10, 20 ],
      filters: {
        globalSearch: {
          filter: containsIgnoreCase,
        },
      },
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState(buildInitialState(nextProps));
  },

  componentWillReceiveProps(nextProps) {
    //If update is false, then preserve the sortBy order, but update
    //everything else
    if (nextProps.update === false ){
      this.setState({
        data: sort(this.state.sortBy, nextProps.initialData.slice(0)),
        sortBy: this.state.sortBy,
        filterValues: {},
        currentPage: 0,
        pageLength: nextProps.initialPageLength,
      });
      return;
    }
    this.setState(buildInitialState(nextProps));
  },

  onSort(sortBy) {
    this.setState({
      sortBy: sortBy,
      data: sort(sortBy, this.state.data),
    });
  },

  onFilter(filterName, filterValue) {
    var {filterValues, sortBy} = this.state;
    var {initialData, filters} = this.props;

    filterValues[filterName] = filterValue;
    var newData = filter(filters, filterValues, initialData);
    newData = sort(sortBy, newData);

    this.setState({
      data: newData,
      filterValues: filterValues,
      currentPage: 0,
    });
  },

  // Pagination
  buildPage() {
    var {data, currentPage, pageLength} = this.state;
    var start = pageLength * currentPage;

    return {
      data: data.slice(start, start + pageLength),
      currentPage: currentPage,
      totalPages: Math.ceil(data.length / pageLength),
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
      currentPage: newPage,
    });
  },

};
