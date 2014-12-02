var React = require('react');
var TableHeader = require('./TableHeader');
var $__0=    require('./utils'),isFunc=$__0.isFunc,isEmpty=$__0.isEmpty,keyGetter=$__0.keyGetter;

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

      row.push(React.createElement("td", {key: j, className: className}, value));
    }

    // Use the key to keep track of the selection
    var key = getKeys(currentData).join(',');
    var rowClass = selected === key ? 'active' : null;
    var rowClickedEvent = rowClicked ?
        rowClicked.bind(null, currentData, key) : null;
    result.push(
      React.createElement("tr", {
        key: key, 
        className: rowClass, 
        onClick: rowClickedEvent}, 
        row
      )
    );
  }

  return result;
}

var emptyRow = React.createElement("tr", null, React.createElement("td", {colSpan: 100, className: "text-center"}, "No data"));

var Table = React.createClass({displayName: 'Table',

  propTypes: {
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
    ])).isRequired
  },

  render:function() {
    var $__0=      this.props,columns=$__0.columns,keys=$__0.keys,dataArray=$__0.dataArray,onRowClicked=$__0.onRowClicked,selected=$__0.selected;
    var getKeys = keyGetter(keys);
    var rows = mapData(columns, dataArray, getKeys, onRowClicked, selected);

    return (
      React.createElement("table", {className: this.props.className}, 
        React.createElement(TableHeader, {
          columns: columns, 
          sortBy: this.props.sortBy, 
          onSort: this.props.onSort}
        ), 
        React.createElement("tbody", null, 
          rows.length ? rows : emptyRow
        )
      )
    );
  }

});

module.exports = Table;
