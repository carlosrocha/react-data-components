import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PartialTable from './PartialTable';
import {
  initialize,
  pageNumberChange,
  pageSizeChange,
  dataFilter,
} from './actions';
import { selectDataTable } from './selectors';
import { containsIgnoreCase } from './utils';

const defaultFilters = {
  globalSearch: { filter: containsIgnoreCase },
};

class DataTable extends Component {
  componentWillMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps) {
    this.init(nextProps);
  }

  init = nextProps => {
    if (!nextProps || !nextProps.initialized) {
      this.props.initialize(this.props.initialData);
    }
  };

  onFilter = (key, { target: { value } }) => this.props.filter(key, value);

  onSort = value => this.props.sort(value);

  onPageSizeChange = ({ target: { value } }) =>
    this.props.changePageSize(value);

  onPageNumberChange = value => this.props.changePageNumber(value);

  render() {
    return (
      <PartialTable
        onFilter={this.onFilter}
        onSort={this.onSort}
        onPageSizeChange={this.onPageSizeChange}
        onPageNumberChange={this.onPageNumberChange}
        {...this.props}
      />
    );
  }
}

DataTable.propTypes = {
  table: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => {
  const {
    buildRowOptions,
    columns,
    initialData,
    keys,
    pageLengthOptions,
    table,
  } = props;

  const data = selectDataTable(table)(state);
  const initialized = data && data.initialized;

  return {
    buildRowOptions,
    columns,
    data,
    initialData,
    initialized,
    keys,
    pageLengthOptions,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const filters = ownProps.filter || defaultFilters;
  const { table } = ownProps;

  return {
    changePageNumber: pageNumber =>
      dispatch(pageNumberChange(pageNumber, table)),
    changePageSize: pageSize => dispatch(pageSizeChange(pageSize, table)),
    initialize: initialData => dispatch(initialize(initialData, table)),
    filter: (key, value) => dispatch(dataFilter(key, value, filters, table)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
