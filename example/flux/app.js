import React from 'react';
import ReactDOM from 'react-dom';
import { getData } from './WebAPIUtils';
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

getData('/data.json');

ReactDOM.render(<FluxTable />, document.getElementById('app'));
