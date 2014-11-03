var React = require('react');
var TableHeader = require('./TableHeader');
var {isFunc, isEmpty, keyGetter} = require('./utils');

function mapData(columns, data, getKeys, rowClicked, selected) {
  var result = [];

  for (var i = 0; i < data.length; i++) {
    var row = [];
    var currentData = data[i];

    for (var j = 0; j < columns.length; j++) {
      var def = columns[j];
      var value = currentData[def.prop];
      var className = def.className;

      // If prop is defined then it was expecting a value from the data.
      if (def.prop && isEmpty(value)) {
        value = def.defaultContent;
        className = 'empty-cell';
      }

      if (def.render) {
        value = def.render(value, currentData);
      }

      if (isFunc(className)) {
        className = className(value, currentData);
      }

      row.push(<td key={j} className={className}>{value}</td>);
    }

    // Use the key to keep track of the selection
    var key = getKeys(currentData).join(',');
    var rowClass = selected === key ? 'active' : null;
    var rowClickedEvent = rowClicked ?
        rowClicked.bind(null, currentData, key) : null;
    result.push(
      <tr
        key={key}
        className={rowClass}
        onClick={rowClickedEvent}>
        {row}
      </tr>
    );
  }

  return result;
}

var emptyRow = <tr><td colSpan={100} className="text-center">No data</td></tr>;

var Table = React.createClass({

  propTypes: {
    columns: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      prop: React.PropTypes.string,
      render: React.PropTypes.func,
      sortable: React.PropTypes.bool,
      defaultContent: React.PropTypes.string,
      className: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.func
      ])
    })).isRequired,
    dataArray: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ])).isRequired
  },

  render() {
    var {columns, keys, dataArray, onRowClicked, selected} = this.props;
    var getKeys = keyGetter(keys);
    var rows = mapData(columns, dataArray, getKeys, onRowClicked, selected);

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
