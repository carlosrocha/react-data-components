var { sort, filter } = require('./utils');

var containsIgnoreCase = function(a, b) {
  a = (a + '').toLowerCase().trim();
  b = (b + '').toLowerCase().trim();
  return b.indexOf(a) >= 0;
};

// Called for both building initial state and subsequent states
function buildState(props) {
  let data = props.initialData.slice(0);
  let sortBy = props.initialSortBy;

  if (this.state !== null){
    //if there's data
    if (this.state.sortBy && this.state.data.length !== 0){
      //if the data changes
      if (JSON.stringify(data) !== JSON.stringify(this.state.data)) {
        //resort the data
        data = sort(this.state.sortBy, data);
        sortBy = this.state.sortBy;
      }
    }
  }

  return {
    data: data,
    sortBy: sortBy,
    filterValues: {},
    currentPage: 0,
    pageLength: props.initialPageLength,
  };
}

module.exports = {

  getInitialState() {
    return buildState.call(this, this.props);
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
    this.setState(buildState.call(this, nextProps));
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
