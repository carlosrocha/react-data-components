/**
 * @jsx React.DOM
 */

var React = require('react');
var Table = require('./Table');
var Pagination = require('./Pagination');
var SelectField = require('./SelectField');
var SearchField = require('./SearchField');

var SortMixin = require('./SortMixin');
var PageMixin = require('./PageMixin');
var FilterMixin = require('./FilterMixin');

var DataTable = React.createClass({
  mixins: [ SortMixin, PageMixin, FilterMixin ],

  getInitialState: function() {
    return {
      // Clone the initialData.
      data: this.props.initialData.slice(0)
    };
  },

  render: function() {
    var page = this.buildPage();

    return this.transferPropsTo(
      <div>
        <div className="row">
          <div className="col-md-6">
            <div className="select-control">
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
                value={this.state.globalSearch}
                onChange={this.onFilterGlobal}
              />
            </div>
          </div>
          <div className="col-md-6">
            <Pagination
              className="pagination"
              currentPage={page.currentPage}
              totalPages={page.totalPages}
              onChangePage={this.onChangePage}
            />
          </div>
        </div>
        <Table
          className="table table-bordered"
          dataArray={page.data}
          columns={this.props.columns}
          keys={this.props.keys}
          sortBy={this.state.sortBy}
          onSort={this.onSort}
        />
      </div>
    );
  }
});

module.exports = DataTable;
