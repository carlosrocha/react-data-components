/** @jsx React.DOM */

require('../../less/datalist.less');

var React = require('react');
window.React = React;
var {csv} = require('d3');
var {DataList} = require('../../');

var csvFile = '/example/table/CTA_-_Map_of_Fare_Media_Sales_Outlets.csv';

csv(csvFile, (error, rows) => render(rows));

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
  React.renderComponent((
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
