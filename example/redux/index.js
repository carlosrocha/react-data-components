import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import {
  dataReducer,
  actions,
  ReduxTable as DataTable,
} from 'react-data-components';

const TABLE = 'react-data-components-example';
const store = createStore(combineReducers({ datatable: dataReducer }));

const renderMapUrl = (val, row) =>
  <a href={`https://www.google.com/maps?q=${row['lat']},${row['long']}`}>
    Google Maps
  </a>;

render(
  <Provider store={store}>
    <DataTable
      keys="id"
      table={TABLE}
      pageLengthOptions={[5, 10, 20]}
      columns={[
        { title: 'Name', prop: 'name' },
        { title: 'City', prop: 'city' },
        { title: 'Street address', prop: 'street' },
        { title: 'Phone', prop: 'phone', defaultContent: '<no phone>' },
        { title: 'Map', render: renderMapUrl, className: 'text-center' },
      ]}
    />
  </Provider>,
  document.getElementById('root'),
);

fetch('/data.json').then(res => res.json()).then(data => {
  store.dispatch(actions.dataLoaded(data, TABLE));
});
