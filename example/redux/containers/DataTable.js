import React from 'react';
import {connect} from 'react-redux';
import {PartialTable} from 'react-data-components';
import {containsIgnoreCase} from 'react-data-components/utils';
import {
  dataFilter, dataSort, pageSizeChange, pageNumberChange,
} from 'react-data-components/actions';

const filters = {
  globalSearch: { filter: containsIgnoreCase },
};

const mapStateToProps = (state) => ({ data: state });

const mapDispatchToProps = (dispatch) => ({
  onFilter(key, {target: {value}}) {
    dispatch(dataFilter(key, value, filters));
  },
  onSort(value) {
    dispatch(dataSort(value));
  },
  onPageSizeChange({target: {value}}) {
    dispatch(pageSizeChange(value));
  },
  onPageNumberChange(value) {
    dispatch(pageNumberChange(value));
  },
});

const DataTable = connect(mapStateToProps, mapDispatchToProps)(PartialTable);

export default DataTable;
