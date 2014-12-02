var React = require('react');
var List = require('./List');
var Pagination = require('./Pagination');
var SelectField = require('./SelectField');
var SearchField = require('./SearchField');
var Dropdown = require('./Dropdown');

var DataMixin = require('./DataMixin');

var DataList = React.createClass({displayName: 'DataList',

  mixins: [ DataMixin ],

  render:function() {
    var page = this.buildPage();

    return (
      React.createElement("div", {className: this.props.className}, 
        React.createElement(Dropdown, {
          label: "Sort", 
          options: this.props.sortOptions, 
          selected: this.state.sortBy, 
          onSelected: this.onSort}
        ), 
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
        ), 
        React.createElement(List, {
          className: "datalist", 
          dataArray: page.data, 
          columns: this.props.columns}
        ), 
        React.createElement(Pagination, {
          className: "pagination", 
          currentPage: page.currentPage, 
          totalPages: page.totalPages, 
          onChangePage: this.onChangePage}
        )
      )
    );
  }

});

module.exports = DataList;
