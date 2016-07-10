import React, {Component} from 'react';
import Table from './Table';
import enhanceDataTable from './enhanceDataTable';
import Pagination from './Pagination';

class DataTable extends Component {

  render() {
    const {
      page, pageSize, pageNumber,
      totalPages, sortBy, filterValues,
    } = this.props.data;

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-4">
            <div>
              <label htmlFor="page-menu">Page size:</label>
              <select
                id="page-menu"
                value={pageSize}
                onChange={this.props.onPageSizeChange}
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
                value={filterValues.globalSearch}
                onChange={this.props.onFilter.bind(null, 'globalSearch')}
              />
            </div>
          </div>
          <div className="col-xs-8">
            <Pagination
              className="pagination pull-right"
              currentPage={pageNumber}
              totalPages={totalPages}
              onChangePage={this.props.onPageNumberChange}
            />
          </div>
        </div>
        <Table
          className="table table-bordered"
          dataArray={page}
          columns={this.props.columns}
          keys={this.props.keys}
          buildRowOptions={this.props.buildRowOptions}
          sortBy={sortBy}
          onSort={this.props.onSort}
        />
      </div>
    );
  }

}

export default enhanceDataTable(DataTable);
