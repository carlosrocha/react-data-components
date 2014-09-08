/**
 * @jsx React.DOM
 */

var React = require('react');
var TableHeader = require('./TableHeader');
var closure = require('./utils').closure;

/**
 * @param {Object} obj the object to check.
 * @return {Boolen} true if the object is a function, false otherwise.
 */
var isFunc = function(obj) { return typeof obj === 'function'; };

/**
 * Creates a function to get keys of objects.
 * @param {Array} keys Array of keys to get.
 * @return {Array} the array of values of the keys.
 */
var keyGetter = function(keys) {
  return function(data) {
    return keys.map(function(key) {
      return data[key];
    });
  };
};

var mapData = function(columns, data, getKeys, rowClicked, selected) {
  var result = [];

  for (var i = 0; i < data.length; i++) {
    var row = [];
    var currentData = data[i];

    for (var j = 0; j < columns.length; j++) {
      var def = columns[j];
      var value = currentData[def.prop];
      var className = def.className;

      // If prop is defined then it was expecting a value from the data.
      if (def.prop && (value === undefined || value === null)) {
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
    var rowClass = selected === key ? 'selected' : null;
    var rowClickedEvent = rowClicked ? rowClicked(currentData, key) : null;
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
};

var emptyRow = <tr><td colSpan={100} className="text-center">No data</td></tr>;

var Table = React.createClass({
  propTypes: {
    columns: React.PropTypes.array.isRequired,
    dataArray: React.PropTypes.array.isRequired
  },

  render: function() {
    var columns = this.props.columns;
    var getKeys = keyGetter(this.props.keys);
    var rowClicked = closure(this.props.onRowClicked);
    var rows = mapData(columns, this.props.dataArray, getKeys, rowClicked, this.props.selected);

    return this.transferPropsTo(
      <table>
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
