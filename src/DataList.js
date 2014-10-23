/** @jsx React.DOM */
var React = require('react');
var List = require('./List');
var Pagination = require('./Pagination');
var SelectField = require('./SelectField');
var SearchField = require('./SearchField');
var Dropdown = require('./Dropdown');

var SortMixin = require('./SortMixin');
var PageMixin = require('./PageMixin');
var FilterMixin = require('./FilterMixin');

var DataList = React.createClass({

  mixins: [ SortMixin, PageMixin, FilterMixin ],

  getInitialState() {
    return {
      // Clone the initialData.
      data: this.props.initialData.slice(0)
    };
  },

  render() {
    var page = this.buildPage();

    return (
      <div className={this.props.className}>
        <Dropdown
          label="Sort"
          options={this.props.sortOptions}
          selected={this.state.sortBy}
          onSelected={this.onSort}
        />
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
          value={this.state.filterValues['globalSearch']}
          onChange={this.onFilter.bind(this, 'globalSearch')}
        />
        <List
          className="datalist"
          dataArray={page.data}
          columns={this.props.columns}
        />
        <Pagination
          className="pagination"
          currentPage={page.currentPage}
          totalPages={page.totalPages}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }

});

module.exports = DataList;
