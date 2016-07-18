import React from 'react';
import {connect} from 'react-redux';
import {PartialTable, utils, actions} from 'react-data-components';

const filters = {
  globalSearch: { filter: utils.containsIgnoreCase },
};

const mapStateToProps = (state) => ({ data: state });

const mapDispatchToProps = (dispatch) => ({
  onFilter(key, {target: {value}}) {
    dispatch(actions.dataFilter(key, value, filters));
  },
  onSort(value) {
    dispatch(actions.dataSort(value));
  },
  onPageSizeChange({target: {value}}) {
    dispatch(actions.pageSizeChange(value));
  },
  onPageNumberChange(value) {
    dispatch(actions.pageNumberChange(value));
  },
});

const DataTable = connect(mapStateToProps, mapDispatchToProps)(PartialTable);

export default DataTable;
