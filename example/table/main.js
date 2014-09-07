/**
 * @jsx React.DOM
 */

//require('../../less/table.less');
require('../../less/table-twbs.less');

var React = require('react');
var d3 = require('d3');
var DataTable = require('../../').DataTable;

var csvFile = '/example/table/CTA_-_Map_of_Fare_Media_Sales_Outlets.csv';

var renderMapUrl = function(val, list) {
  var url = 'http://maps.google.com/?q=' + list['LAT'] + ',' + list['LON'];
  return <a href={url}>Google Maps</a>;
};

d3.csv(csvFile, function(error, rows) {
  render(rows);
});

var columns = [
  { title: 'Name', prop: 'NAME'  },
  { title: 'City', prop: 'CITY' },
  { title: 'Street address', prop: 'STREET ADDRESS' },
  { title: 'Phone', prop: 'PHONE NUMBER', defaultContent: '<no phone>' },
  { title: 'Map', render: renderMapUrl, className: 'text-center' }
];

var render = function(data) {
  React.renderComponent((
      <DataTable
        className="container"
        keys={[ 'NAME', 'OUTLET TYPE', 'STREET ADDRESS' ]}
        columns={columns}
        initialData={data}
        initialPageLength={5}
        initialSortBy={{ prop: 'CITY', order: 'desc' }}
        pageLengthOptions={[ 5, 20, 50 ]}
      />
    ), document.body);
};
