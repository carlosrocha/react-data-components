# react-data-components

## Getting started

```sh
npm install react-data-components --save
```

### Using the default implementation

```javascript
var React = require('react');
var DataTable = require('react-data-components').DataTable;

var columns = [
  { title: 'Name', prop: 'name'  },
  { title: 'City', prop: 'city' },
  { title: 'Address', prop: 'address' },
  { title: 'Phone', prop: 'phone' }
];

var data = [
  { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' }
  // It also supports arrays
  // [ 'name value', 'city value', 'address value', 'phone value' ]
];

React.render((
    <DataTable
      className="container"
      keys={[ 'name', 'address' ]}
      columns={columns}
      initialData={data}
      initialPageLength={5}
      initialSortBy={{ prop: 'city', order: 'desc' }}
      pageLengthOptions={[ 5, 20, 50 ]}
    />
  ), document.body);
```

See [complete example](example/table/main.js). Also see [flux example](example/flux/).

## DataTable options

Name                | Type               | Description
------------------- | ------------------ | ----------------------------------
`keys`              | array              | Properties that make each row unique, e.g. an id.
`columns`           | array              | See column options.
`pageLengthOptions` | array              | Page length options.
`initialData`       | array              | The data to display.
`initialPageLength` | number             | Initial page length.
`initialSortBy`     | object             | Initial sorting, needs `prop` and `order`.

## Column options

Name             | Type               | Description
---------------- | ------------------ | ----------------------------------
`title`          | string             | The title to display on the header.
`prop`           | string or number   | The name of the property or index on the data.
`render`         | function           | Function to customize the render on column.
`className`      | string or function | Class for the td.
`defaultContent` | string             | The default value to display if no data.
`sortable`       | boolean            | `true` by default.
`width`          | string or number   | Width for the column.
