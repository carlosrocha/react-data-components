require('bootstrap/less/bootstrap.less');
require('font-awesome/less/font-awesome.less');
require('../../css/table-twbs.css');
require('../../css/pagination.css');

var React = require('react');
var { DataTable } = require('react-data-components');
var d3 = require('d3');

function buildTable(data) {
  var renderMapUrl =
    (val, row) =>
      <a href={`https://www.google.com/maps?q=${row['LAT']},${row['LON']}`}>
        Google Maps
      </a>;

  var tableColumns = [
    { title: 'Name', prop: 'NAME' },
    { title: 'City', prop: 'CITY' },
    { title: 'Street address', prop: 'STREET ADDRESS' },
    { title: 'Phone', prop: 'PHONE NUMBER', defaultContent: '<no phone>' },
    { title: 'Map', render: renderMapUrl, className: 'text-center' }
  ];

  return (
    <DataTable
      className="container"
      keys={[ 'NAME', 'OUTLET TYPE', 'STREET ADDRESS' ]}
      columns={tableColumns}
      initialData={data}
      initialPageLength={5}
      initialSortBy={{ prop: 'CITY', order: 'desc' }}
      pageLengthOptions={[ 5, 20, 50 ]}
    />
  );
}

d3.csv('sample_data.csv', function(error, rows) {
  React.render(buildTable(rows), document.body);
});