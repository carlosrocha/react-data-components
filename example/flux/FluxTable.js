var React = require('react');
var { Table, Pagination, SelectField, SearchField } =
  require('react-data-components');
var DataStore = require('./DataStore');
var ViewActionCreators = require('./ViewActionCreators');

var renderMapUrl =
  (val, row) =>
    <a href={`https://www.google.com/maps?q=${row['LAT']},${row['LON']}`}>
      Google Maps
    </a>;

function getStateFromStore() {
  return { data: DataStore.getData() };
}

var FluxTable = React.createClass({

  keys: [ 'NAME', 'OUTLET TYPE', 'STREET ADDRESS' ],

  columns: [
    { title: 'Name', prop: 'NAME'  },
    { title: 'City', prop: 'CITY' },
    { title: 'Street address', prop: 'STREET ADDRESS' },
    { title: 'Phone', prop: 'PHONE NUMBER', defaultContent: '<no phone>' },
    { title: 'Map', render: renderMapUrl, className: 'text-center' }
  ],

  getInitialState() {
    return getStateFromStore();
  },

  componentDidMount() {
    DataStore.addChangeListener(this.handleStoreChange);
  },

  componentWillUnmount() {
    DataStore.removeChangeListener(this.handleStoreChange);
  },

  handleStoreChange() {
    this.setState(getStateFromStore());
  },

  render() {
    var {data} = this.state;

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
          columns={this.columns}
          keys={this.keys}
          dataArray={data.page}
          sortBy={data.sortBy}
          onSort={ViewActionCreators.sort}
        />
      </div>
    );
  }

});

module.exports = FluxTable;
