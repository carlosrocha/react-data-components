module.exports = {

  getDefaultProps() {
    return {
      initialPageLength: 10,
      pageLengthOptions: [ 5, 10, 20 ]
    };
  },

  getInitialState() {
    return {
      currentPage: 0,
      pageLength: this.props.initialPageLength
    };
  },

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

  onPageLengthChange(e) {
    var newPageLength = +e.target.value;
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
