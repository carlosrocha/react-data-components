import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {namedDataReducer, actions} from 'react-data-components';
import DataTable from './containers/DataTable';

const rootReducer = combineReducers({
  tableA: namedDataReducer("tableA"),
  tableB: namedDataReducer("tableB")
});

const store = createStore(rootReducer);

const renderMapUrl =
  (val, row) =>
    <a href={`https://www.google.com/maps?q=${row['lat']},${row['long']}`}>
      Google Maps
    </a>;

const DataTableA = DataTable("tableA");
const DataTableB = DataTable("tableB");

render(
  <Provider store={store}>
    <div>
      <DataTableA
        keys="id"
        pageLengthOptions={[ 5, 10, 20 ]}
        columns={[
          { title: 'Name', prop: 'name' },
          { title: 'City', prop: 'city' },
          { title: 'Street address', prop: 'street' },
          { title: 'Phone', prop: 'phone', defaultContent: '<no phone>' },
          { title: 'Map', render: renderMapUrl, className: 'text-center' },
        ]}
      />
      <DataTableB
        keys="id"
        pageLengthOptions={[ 5, 10, 20 ]}
        columns={[
          { title: 'Name', prop: 'name' },
          { title: 'Author', prop: 'author' },
          { title: 'Series', prop: 'series_t' },
          { title: 'Genre', prop: 'genre_s' },
          { title: 'Price', prop: 'price' },
        ]}
      />
    </div>
  </Provider>,
  document.getElementById('root')
);

fetch('/data.json')
  .then(res => res.json())
  .then(data => {
    store.dispatch({
      ...actions.dataLoaded(data),
      name: "tableA"
    });
  })

fetch('/books.json')
  .then(res => res.json())
  .then(data => {
    store.dispatch({
      ...actions.dataLoaded(data),
      name: "tableB"
    });
  });
