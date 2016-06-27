import { sort, filter } from './utils';

const containsIgnoreCase = function(a, b) {
  a = String(a).toLowerCase().trim();
  b = String(b).toLowerCase().trim();
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

  componentWillMount() {
    // Do the initial sorting if specified.
    const {sortBy, data} = this.state;
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
    const {filterValues, sortBy} = this.state;
    const {initialData, filters} = this.props;

    filterValues[filterName] = filterValue;
    let newData = filter(filters, filterValues, initialData);
    newData = sort(sortBy, newData);

    this.setState({
      data: newData,
      filterValues: filterValues,
      currentPage: 0,
    });
  },

  // Pagination
  buildPage() {
    const {data, currentPage, pageLength} = this.state;
    const start = pageLength * currentPage;

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
    const newPageLength = +value;
    const {currentPage, pageLength} = this.state;
    const newPage = Math.floor((currentPage * pageLength) / newPageLength);

    this.setState({
      pageLength: newPageLength,
      currentPage: newPage,
    });
  },

};
