/**
 * @flow
 */

import React, {Component} from 'react';
import Table from './Table';
import Pagination from './Pagination';
import dataReducer from './dataReducer';
import {
  dataLoaded, dataSort, dataFilter,
  pageNumberChange, pageSizeChange,
} from './actions';
import type {State} from './types';

type Props = {
  pageLengthOptions: Array<number>;
  initialData: Array<any>;
  columns: Array<any>;
  keys: Array<any>;
  buildRowOptions: any;
};

export default class DataTable extends Component {
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    this.state = dataReducer(undefined, dataLoaded(props.initialData));
  }

  onPageNumberChange = value => {
    this.setState(state => dataReducer(state, pageNumberChange(value)));
  };

  onPageSizeChange = ({target: {value}}) => {
    this.setState(state => dataReducer(state, pageSizeChange(value)));
  };

  onSort = value => {
    this.setState(state => dataReducer(state, dataSort(value)));
  };

  onFilter = (key, {target: {value}}) => {
    this.setState(state => dataReducer(state, dataFilter(key, value)));
  };

  render() {
    const {
      page, pageSize, pageNumber,
      totalPages, sortBy, filterValues,
    } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-4">
            <div>
              <label htmlFor="page-menu">Page size:</label>
              <select
                id="page-menu"
                value={pageSize}
                onChange={this.onPageSizeChange}
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
                onChange={this.onFilter.bind(null, 'globalSearch')}
              />
            </div>
          </div>
          <div className="col-xs-8">
            <Pagination
              className="pagination pull-right"
              currentPage={pageNumber}
              totalPages={totalPages}
              onChangePage={this.onPageNumberChange}
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
          onSort={this.onSort}
        />
      </div>
    );
  }

}
