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

  onSort(sortBy) {
    this.setState({
      sortBy: sortBy,
      data: sort(sortBy, this.state.data)
    });
  }

};
