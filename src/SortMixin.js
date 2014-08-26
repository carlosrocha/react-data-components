
var sortByFunc = function(prop) {
  return function(a, b) {
    return a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0;
  };
};

var SortMixin = {
  getInitialState: function() {
    return {
      sortBy: this.props.initialSortBy
    };
  },

  componentWillMount: function() {
    // Do the initial sorting if specified.
    if (this.state.sortBy) {
      this.setState({ data: this.sort(this.state.sortBy) });
    }
  },

  sort: function(sortBy) {
    var sortedData = this.state.data.sort(sortByFunc(sortBy.prop));
    if (sortBy.order === 'desc') {
      sortedData.reverse();
    }

    return sortedData;
  },

  onSort: function(e, prop) {
    var sortBy = this.state.sortBy;

    // If no state before or it was sorting on another column, then initialize on null.
    var prevOrder = !sortBy || sortBy.prop !== prop ? null : sortBy.order;

    // Move to the next sorting order.
    var nextOrder = !prevOrder || prevOrder === 'desc' ? 'asc' : 'desc';
    var nextSortBy = { prop: prop, order: nextOrder };

    // Perform the sort.
    var sortedData = this.sort(nextSortBy);

    this.setState({
      sortBy: nextSortBy,
      data: sortedData
    });
  },
};

module.exports = SortMixin;
