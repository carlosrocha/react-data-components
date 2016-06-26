import React from 'react';
import DataStore from './DataStore';
import * as ViewActionCreators from './ViewActionCreators';
import {
  SelectField,
  Table,
  Pagination,
  SearchField,
} from 'react-data-components';

const renderMapUrl =
  (val, row) =>
    <a href={`https://www.google.com/maps?q=${row['LAT']},${row['LON']}`}>
      Google Maps
    </a>;

const keys = [ 'NAME', 'OUTLET TYPE', 'STREET ADDRESS' ];

const columns = [
  { title: 'Name', prop: 'NAME'  },
  { title: 'City', prop: 'CITY' },
  { title: 'Street address', prop: 'STREET ADDRESS' },
  { title: 'Phone', prop: 'PHONE NUMBER', defaultContent: '<no phone>' },
  { title: 'Map', render: renderMapUrl, className: 'text-center' },
];

function getStateFromStore() {
  return { data: DataStore.getData() };
}

export default class FluxTable extends React.Component {

  constructor() {
    super();
    this.state = getStateFromStore();
    this.handleStoreChange = this.handleStoreChange.bind(this);
  }

  componentDidMount() {
    DataStore.addChangeListener(this.handleStoreChange);
  }

  componentWillUnmount() {
    DataStore.removeChangeListener(this.handleStoreChange);
  }

  handleStoreChange() {
    this.setState(getStateFromStore());
  }

  render() {
    const {data} = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-4">
            <SelectField
              id="page-menu"
              label="Page size:"
              value={data.pageSize}
              options={[ 5, 10, 50 ]}
              onChange={ViewActionCreators.changePageSize}
            />
            <SearchField
              id="search-field"
              label="Search:"
              value={data.filterValues['globalSearch']}
              onChange={ViewActionCreators.filter.bind(this, 'globalSearch')}
            />
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
          keys={keys}
          dataArray={data.page}
          sortBy={data.sortBy}
          onSort={ViewActionCreators.sort}
        />
      </div>
    );
  }

}
