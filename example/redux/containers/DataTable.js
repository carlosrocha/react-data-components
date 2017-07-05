import React from 'react';
import { connect } from 'react-redux';
import { PartialTable, utils, actions, selectors } from 'react-data-components';

const filters = {
  globalSearch: { filter: utils.containsIgnoreCase },
};

const mapStateToProps = (state, ownProps) => ({
  data: selectors.selectDataTable(state, ownProps.domain),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFilter(key, { target: { value } }) {
    dispatch(actions.dataFilter(key, value, filters, ownProps.domain));
  },
  onSort(value) {
    dispatch(actions.dataSort(value, ownProps.domain));
  },
  onPageSizeChange({ target: { value } }) {
    dispatch(actions.pageSizeChange(value, ownProps.domain));
  },
  onPageNumberChange(value) {
    dispatch(actions.pageNumberChange(value, ownProps.domain));
  },
});

const DataTable = connect(mapStateToProps, mapDispatchToProps)(PartialTable);

export default DataTable;
