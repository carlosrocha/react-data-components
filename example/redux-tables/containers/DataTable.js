import React from 'react';
import {connect} from 'react-redux';
import {PartialTable, utils, actions} from 'react-data-components';

const filters = {
  globalSearch: { filter: utils.containsIgnoreCase },
};

const mapStateToProps = (name) => (state) => ({ data: state[name] });

const mapDispatchToProps = (name) => (dispatch) => ({
  onFilter(key, {target: {value}}) {
    dispatch({
      ...actions.dataFilter(key, value, filters),
      name
    });
  },
  onSort(value) {
    dispatch({
      ...actions.dataSort(value),
      name
    });
  },
  onPageSizeChange({target: {value}}) {
    dispatch({
      ...actions.pageSizeChange(value),
      name
    });
  },
  onPageNumberChange(value) {
    dispatch({
      ...actions.pageNumberChange(value),
      name
    });
  },
});

const DataTable = (name) => connect(mapStateToProps(name), mapDispatchToProps(name))(PartialTable);

export default DataTable;
