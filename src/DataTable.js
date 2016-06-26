import React from 'react';
import Table from './Table';
import Pagination from './Pagination';
import SelectField from './SelectField';
import SearchField from './SearchField';
import DataMixin from './DataMixin';

export default React.createClass({

  mixins: [ DataMixin ],

  render() {
    var page = this.buildPage();

    return (
      <div className={this.props.className}>
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
        <Table
          className="table table-bordered"
          dataArray={page.data}
          columns={this.props.columns}
          keys={this.props.keys}
          buildRowOptions={this.props.buildRowOptions}
          sortBy={this.state.sortBy}
          onSort={this.onSort}
        />
      </div>
    );
  },
});
