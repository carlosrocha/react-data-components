import React from 'react';
import ReactDOM from 'react-dom';
import { getCsvFile } from './WebAPIUtils';
import DataStore from './DataStore';
import FluxTable from './FluxTable';

const containsIgnoreCase = function(a, b) {
  a = String(a).toLowerCase().trim();
  b = String(b).toLowerCase().trim();
  return b.indexOf(a) >= 0;
};

DataStore.init({
  pageSize: 5,
  sortBy: { prop: 'CITY', order: 'descending' },
  filters: {
    globalSearch: {
      filter: containsIgnoreCase,
    },
  },
});

getCsvFile('/sample_data.csv');

ReactDOM.render(<FluxTable />, document.getElementById('app'));
