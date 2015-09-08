# react-data-components

[![Build Status](https://travis-ci.org/carlosrocha/react-data-components.svg?branch=master)](https://travis-ci.org/carlosrocha/react-data-components)

DataTable: [Live demo and source](https://jsbin.com/ziyawu/9/edit?js,output)

SelectableTable: [Live demo and source](https://jsbin.com/yokara/edit?js,output)

## Getting started

```sh
npm install react-data-components --save
```

This component requires Bootstrap stylesheet and Font Awesome fonts, in addition
to the [stylesheet for headers](css/table-twbs.css). If you are using Webpack
and the `css-loader` you can also require the css
with `require('react-data-components/css/table-twbs.css')`.

### Using the default implementation

The default implementation includes a filter for case insensitive global search,
pagination and page size.

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
      initialSortBy={{ prop: 'city', order: 'descending' }}
      pageLengthOptions={[ 5, 20, 50 ]}
    />
  ), document.body);
```

See [complete example](example/table/main.js), see [Flux example](example/flux/).

## DataMixin options

#### `keys: Array<string> | string`
Properties that make each row unique, e.g. an id.

#### `columns: Array<ColumnOption>`
See `Table` column options.

#### `pageLengthOptions: Array<number>`

#### `initialData: Array<object | Array<any>>`

#### `initialPageLength: number`

#### `initialSortBy: { prop: string | number, order: string }`

## Table column options

#### `title: string`
The title to display on the header.

#### `prop: string | number`
The name of the property or index on the data.

#### `render: (val: any, row: any) => any`
Function to render a different component.

#### `className: string | (val: any, row: any) => string`
Class name for the td.

#### `defaultContent: string`

#### `sortable: boolean`

#### `width: string | number`
