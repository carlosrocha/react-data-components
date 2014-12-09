var React = require('react');
var TableHeader = require('./TableHeader');

var simpleGet = key => row => row[key];
var keyGetter = keys => data => keys.map(key => data[key]);

var isEmpty = value => value === undefined || value === null || value === '';
var isFunc = value => typeof value === 'function';

var getCellValue =
  (col, row) =>
    col.prop && isEmpty(row[col.prop]) ? col.defaultContent :
      col.render ? col.render(row[col.prop], row) :
      row[col.prop];

var getCellClass =
  (col, row) =>
    col.prop && isEmpty(row[col.prop]) ? 'empty-cell' :
      isFunc(col.className) ? col.className(row[col.prop], row) :
      col.className;

var emptyRow = <tr><td colSpan={100} className="text-center">No data</td></tr>;

var Table = React.createClass({

  propTypes: {
    keys: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.string),
      React.PropTypes.string
    ]).isRequired,
    columns: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      prop: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ]),
      render: React.PropTypes.func,
      sortable: React.PropTypes.bool,
      defaultContent: React.PropTypes.string,
      width: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ]),
      className: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.func
      ])
    })).isRequired,
    dataArray: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ])).isRequired,
    buildRowOpts: React.PropTypes.func
  },

  getDefaultProps() {
    return { buildRowOpts: () => ({}) };
  },

  render() {
    var { columns, keys, dataArray, buildRowOpts } = this.props;
    var getKeys = Array.isArray(keys) ? keyGetter(keys) : simpleGet(keys);
    var rows = dataArray.map(
      row =>
        <tr key={getKeys(row)} {...buildRowOpts(row)}>
          {columns.map(
            (col, j) =>
              <td key={j} className={getCellClass(col, row)}>
                {getCellValue(col, row)}
              </td>
          )}
        </tr>);

    return (
      <table className={this.props.className}>
        <TableHeader
          columns={columns}
          sortBy={this.props.sortBy}
          onSort={this.props.onSort}
        />
        <tbody>
          {rows.length ? rows : emptyRow}
        </tbody>
      </table>
    );
  }

});

module.exports = Table;
