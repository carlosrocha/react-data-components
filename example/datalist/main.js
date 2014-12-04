require('bootstrap/less/bootstrap.less');
require('../../less/rdc.less');

var React = require('react');
var d3 = require('d3');
var { DataList } = require('../../src/index');

var csvFile = '/table/CTA_-_Map_of_Fare_Media_Sales_Outlets.csv';

d3.csv(csvFile, (error, rows) => render(rows));

var big = (data) => <a className="big" href="#">{data}</a>;

var columns = [
  { prop: 'NAME', render: big },
  //  { title: 'City', prop: 'CITY' },
  //  { title: 'Street address', prop: 'STREET ADDRESS' },
  //  { title: 'Phone', prop: 'PHONE NUMBER', defaultContent: '<no phone>' },
  //  { title: 'Map', render: renderMapUrl, className: 'text-center' }
];
var sortOptions = [
  { label: 'Name', value: { prop: 'NAME', order: 'asc' } },
  { label: 'City', value: { prop: 'CITY', order: 'asc' } },
  { label: 'Address', value: { prop: 'STREET ADDRESS', order: 'asc' } }
];

var render = function(data) {
  React.render((
      <DataList
        className="container"
        keys={[ 'NAME', 'OUTLET TYPE', 'STREET ADDRESS' ]}
        initialData={data}
        columns={columns}
        sortOptions={sortOptions}
        initialSortBy={sortOptions[0].value}
      />
  ), document.body);
};
