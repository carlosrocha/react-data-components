var React = require('react');
var Table = require('./Table');
var Pagination = require('./Pagination');
var SelectField = require('./SelectField');
var SearchField = require('./SearchField');

var DataMixin = require('./DataMixin');

var DataTable = React.createClass({

  mixins: [ DataMixin ],

  render() {
    var page = this.buildPage();

    // Manage classes
    var classes = this.props.classes || {};
    var tableClasses = 'table ' + classes.table;

    // Whether to show / hide the top header (search, pagination, etc)
    var header;
    var showHeader = this.props.header === undefined || this.props.header === false ? false : true;

    if (showHeader) {
      header = (
        <div className="row">
          <div className="col-xs-4">
            <SelectField
              id="page-menu"
              label="Page size:"
              value={this.state.pageLength}
              options={this.props.pageLengthOptions}
              onChange={this.onPageLengthChange}
            />
            <SearchField
              id="search-field"
              label="Search:"
              value={this.state.filterValues.globalSearch}
              onChange={this.onFilter.bind(this, 'globalSearch')}
            />
          </div>
          <div className="col-xs-8">
            <Pagination
              className="pagination pull-right"
              currentPage={page.currentPage}
              totalPages={page.totalPages}
              onChangePage={this.onChangePage}
            />
          </div>
        </div>
      )
    }

    return (
      <div className={classes.container}>
        {header}
        <Table
          className={tableClasses}
          dataArray={page.data}
          columns={this.props.columns}
          keys={this.props.keys}
          buildRowOptions={this.props.buildRowOptions}
          sortBy={this.state.sortBy}
          onSort={this.onSort}
          customFooter={this.props.customFooter}
          emptyText={this.props.emptyText}
        />
      </div>
    );
  },
});

module.exports = DataTable;
