var $__0=    ReactDataComponents,DataTable=$__0.DataTable;

function buildTable(data) {
  var renderMapUrl =
    function(val, row) 
      {return React.createElement("a", {href: ("https://www.google.com/maps?q=" + row['LAT'] + "," + row['LON'])}, 
        "Google Maps"
      );};

  var tableColumns = [
    { title: 'Name', prop: 'NAME' },
    { title: 'City', prop: 'CITY' },
    { title: 'Street address', prop: 'STREET ADDRESS' },
    { title: 'Phone', prop: 'PHONE NUMBER', defaultContent: '<no phone>' },
    { title: 'Map', render: renderMapUrl, className: 'text-center' }
  ];

  return (
    React.createElement(DataTable, {
      keys: [ 'NAME', 'OUTLET TYPE', 'STREET ADDRESS'], 
      columns: tableColumns, 
      initialData: data, 
      initialPageLength: 5, 
      initialSortBy: { prop: 'CITY', order: 'desc'}, 
      pageLengthOptions: [ 5, 20, 50]}
    )
  );
}

d3.csv('sample_data.csv', function(error, rows) {
  React.render(buildTable(rows), document.getElementById('datatable'));
});
