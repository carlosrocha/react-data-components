import React, { Component } from 'react';
import DataStore from './DataStore';
import * as ViewActionCreators from './ViewActionCreators';
import { Table, Pagination } from 'react-data-components';

const renderMapUrl =
  (val, row) =>
    <a href={`https://www.google.com/maps?q=${row['lat']},${row['long']}`}>
      Google Maps
    </a>;

const pageLengthOptions = [ 5, 10, 50 ];

const columns = [
  { title: 'Name', prop: 'name'  },
  { title: 'City', prop: 'city' },
  { title: 'Street address', prop: 'street' },
  { title: 'Phone', prop: 'phone', defaultContent: '<no phone>' },
  { title: 'Map', render: renderMapUrl, className: 'text-center' },
];

function getStateFromStore() {
  return { data: DataStore.getData() };
}

export default class FluxTable extends Component {

  constructor() {
    super();
    this.state = getStateFromStore();
  }

  componentDidMount() {
    DataStore.addChangeListener(this.handleStoreChange);
  }

  componentWillUnmount() {
    DataStore.removeChangeListener(this.handleStoreChange);
  }

  handleStoreChange = () => {
    this.setState(getStateFromStore());
  };

  render() {
    const {data} = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-4">
            <div>
              <label htmlFor="page-menu">Page size:</label>
              <select
                id="page-menu"
                value={data.pageSize}
                onChange={e =>
                  ViewActionCreators.changePageSize(e.target.value)
                }
              >
                {pageLengthOptions.map(opt =>
                  <option key={opt} value={opt}>{opt}</option>
                )}
              </select>
            </div>
            <div>
              <label htmlFor="search-field">Search:</label>
              <input
                id="search-field"
                type="search"
                value={data.filterValues['globalSearch']}
                onChange={e =>
                  ViewActionCreators.filter('globalSearch', e.target.value)
                }
              />
            </div>
          </div>
          <div className="col-xs-8">
            <Pagination
              className="pagination pull-right"
              currentPage={data.pageNumber}
              totalPages={data.totalPages}
              onChangePage={ViewActionCreators.changePageNumber}
            />
          </div>
        </div>
        <Table
          className="table table-bordered"
          columns={columns}
          keys="id"
          dataArray={data.page}
          sortBy={data.sortBy}
          onSort={ViewActionCreators.sort}
        />
      </div>
    );
  }

}
