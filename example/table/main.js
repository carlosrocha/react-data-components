import React from 'react';
import ReactDOM from 'react-dom';
import { DataTable } from 'react-data-components';
import { csv } from 'd3-request';

function buildTable(data) {
  const renderMapUrl =
    (val, row) =>
      <a href={`https://www.google.com/maps?q=${row['LAT']},${row['LON']}`}>
        Google Maps
      </a>;

  const tableColumns = [
    { title: 'Name', prop: 'NAME' },
    { title: 'City', prop: 'CITY' },
    { title: 'Street address', prop: 'STREET ADDRESS' },
    { title: 'Phone', prop: 'PHONE NUMBER', defaultContent: '<no phone>' },
    { title: 'Map', render: renderMapUrl, className: 'text-center' },
  ];

  return (
    <DataTable
      className="container"
      keys={[ 'NAME', 'OUTLET TYPE', 'STREET ADDRESS' ]}
      columns={tableColumns}
      initialData={data}
      initialPageLength={5}
      initialSortBy={{ prop: 'CITY', order: 'descending' }}
      pageLengthOptions={[ 5, 20, 50 ]}
    />
  );
}

csv('/sample_data.csv', function(error, rows) {
  ReactDOM.render(buildTable(rows), document.getElementById('app'));
});
