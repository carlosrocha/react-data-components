import React from 'react';
import Table from './Table';
import Pagination from './Pagination';
import DataMixin from './DataMixin';

export default React.createClass({

  mixins: [ DataMixin ],

  render() {
    var page = this.buildPage();

    return (
      <div className={this.props.className}>
        <div className="row">
          <div className="col-xs-4">
            <div>
              <label htmlFor="page-menu">Page size:</label>
              <select
                id="page-menu"
                value={this.state.pageLength}
                onChange={e => this.onPageLengthChange(e.target.value)}
              >
                {this.props.pageLengthOptions.map(opt =>
                  <option key={opt} value={opt}>{opt}</option>
                )}
              </select>
            </div>
            <div>
              <label htmlFor="search-field">Search:</label>
              <input
                id="search-field"
                type="search"
                value={this.state.filterValues.globalSearch}
                onChange={e => this.onFilter('globalSearch', e.target.value)}
              />
            </div>
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
