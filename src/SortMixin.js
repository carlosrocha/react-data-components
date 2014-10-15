var {sortByFunc} = require('./utils');

function sort(sortBy, data) {
  var sortedData = data.sort(sortByFunc(sortBy.prop));
  if (sortBy.order === 'desc') {
    sortedData.reverse();
  }
  return sortedData;
}

module.exports = {

  getInitialState() {
    return { sortBy: this.props.initialSortBy };
  },

  componentWillMount() {
    // Do the initial sorting if specified.
    var {sortBy, data} = this.state;
    if (sortBy) {
      this.setState({ data: sort(sortBy, data) });
    }
  },

  onSort(prop) {
    var {sortBy, data} = this.state;

    // If no state before or it was sorting on another column, then initialize on null.
    var prevOrder = !sortBy || sortBy.prop !== prop ? null : sortBy.order;

    // Move to the next sorting order.
    var nextOrder = !prevOrder || prevOrder === 'desc' ? 'asc' : 'desc';
    var nextSortBy = { prop: prop, order: nextOrder };

    // Perform the sort.
    var sortedData = sort(nextSortBy, data);

    this.setState({
      sortBy: nextSortBy,
      data: sortedData
    });
  }

};
