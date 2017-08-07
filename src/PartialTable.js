import React, { Component } from 'react';
import Table from './Table';
import Pagination from './Pagination';

export default class PartialTable extends Component {
  render() {
    const {
      onFilter,
      onPageSizeChange,
      onPageNumberChange,
      onSort,
      pageLengthOptions,
      columns,
      keys,
      buildRowOptions,
    } = this.props;

    // Protect against unloaded data.
    if (!this.props.data) {
      return null;
    }

    const {
      page,
      pageSize,
      pageNumber,
      totalPages,
      sortBy,
      filterValues,
    } = this.props.data;

    console.log('\n\n\n\ninside react-data-components\n\n');

    console.log('pageSize:');
    console.log(pageSize);
    console.log('totalPages:');
    console.log(totalPages);
    console.log('page:');
    console.log(page);

    if (totalPages == 1) {
      var amount_of_elements = page.length;
    } else {
      var amount_of_elements = pageSize * totalPages;
    }

    console.log('amount_of_elements:');
    console.log(amount_of_elements);

    if (amount_of_elements < 60) {
      var pageSizeSelector = null;
    } else {
      var pageSizeSelector = (
        <div>
          <label htmlFor="page-menu">Page size:</label>
          <select id="page-menu" value={pageSize} onChange={onPageSizeChange}>
            {pageLengthOptions.map(opt =>
              <option key={opt} value={opt}>
                {opt === 0 ? 'All' : opt}
              </option>,
            )}
          </select>
        </div>
      );
    }

    let pagination_tabs = <div className="col-xs-8" />;
    if (totalPages > 1) {
      pagination_tabs = (
        <div className="col-xs-8">
          <Pagination
            className="pagination pull-right"
            currentPage={pageNumber}
            totalPages={totalPages}
            onChangePage={onPageNumberChange}
          />
        </div>
      );
    }

    let topRowMarginBottom = 0;
    if (totalPages < 2) {
      topRowMarginBottom = 20;
    }

    return (
      <div className="container">
        <div className="row" style={{ marginBottom: topRowMarginBottom }}>
          <div className="col-xs-4">
            {pageSizeSelector}
            <div>
              <label htmlFor="search-field">Search:</label>
              <input
                id="search-field"
                type="search"
                value={filterValues.globalSearch}
                onChange={onFilter.bind(null, 'globalSearch')}
              />
            </div>
          </div>
          {pagination_tabs}
        </div>
        <Table
          className="table table-bordered"
          dataArray={page}
          columns={columns}
          keys={keys}
          buildRowOptions={buildRowOptions}
          sortBy={sortBy}
          onSort={onSort}
        />
      </div>
    );
  }
}
