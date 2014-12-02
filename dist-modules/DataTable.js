var React = require('react');
var Table = require('./Table');
var Pagination = require('./Pagination');
var SelectField = require('./SelectField');
var SearchField = require('./SearchField');

var DataMixin = require('./DataMixin');

var DataTable = React.createClass({displayName: 'DataTable',

  mixins: [ DataMixin ],

  render:function() {
    var page = this.buildPage();

    return (
      React.createElement("div", {className: this.props.className}, 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-xs-4"}, 
            React.createElement(SelectField, {
              id: "page-menu", 
              label: "Page size:", 
              value: this.state.pageLength, 
              options: this.props.pageLengthOptions, 
              onChange: this.onPageLengthChange}
            ), 
            React.createElement(SearchField, {
              id: "search-field", 
              label: "Search:", 
              value: this.state.filterValues['globalSearch'], 
              onChange: this.onFilter.bind(this, 'globalSearch')}
            )
          ), 
          React.createElement("div", {className: "col-xs-8"}, 
            React.createElement(Pagination, {
              className: "pagination pull-right", 
              currentPage: page.currentPage, 
              totalPages: page.totalPages, 
              onChangePage: this.onChangePage}
            )
          )
        ), 
        React.createElement(Table, {
          className: "table table-bordered", 
          dataArray: page.data, 
          columns: this.props.columns, 
          keys: this.props.keys, 
          sortBy: this.state.sortBy, 
          onSort: this.onSort}
        )
      )
    );
  }
});

module.exports = DataTable;
