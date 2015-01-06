var React = require('react');

var simpleGet = function(key)  {return function(data)  {return data[key];};};
var keyGetter = function(keys)  {return function(data)  {return keys.map(function(key)  {return data[key];});};};

var isEmpty = function(value)  {return value === undefined || value === null || value === '';};
var isFunc = function(value)  {return typeof value === 'function';};

var getSortClass =
  function(sortBy, prop) 
    {return sortBy.prop === prop ?
      (sortBy.order === 'asc' ? 'sort-asc' : 'sort-desc') :
      'sort-off';};

var getNextOrder =
  function(sortBy, prop) 
    {return sortBy.prop === prop && sortBy.order === 'asc' ? 'desc' : 'asc';};

var getCellValue =
  function(col, row) 
    {return col.prop && isEmpty(row[col.prop]) ? col.defaultContent :
      col.render ? col.render(row[col.prop], row) :
      row[col.prop];};

var getCellClass =
  function(col, row) 
    {return col.prop && isEmpty(row[col.prop]) ? 'empty-cell' :
      isFunc(col.className) ? col.className(row[col.prop], row) :
      col.className;};

var Table = React.createClass({displayName: "Table",

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
    buildRowOpts: React.PropTypes.func,
    sortBy: React.PropTypes.shape({
      prop: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ]),
      order: React.PropTypes.oneOf([ 'asc', 'desc' ])
    }),
    onSort: React.PropTypes.func
  },

  getDefaultProps:function() {
    return {
      buildRowOpts: function()  {return {};},
      sortBy: {}
    };
  },

  componentDidMount:function() {
    // If no width was specified, then set the width that the browser applied
    // initially to avoid recalculating width between pages.
    for (var i = 0; i < this.props.columns.length; i++) {
      var thDom = this.refs[("th-" + i)].getDOMNode();
      if (!thDom.style.width) {
        thDom.style.width = (thDom.offsetWidth + "px");
      }
    }
  },

  render:function() {
    var $__0=        this.props,columns=$__0.columns,keys=$__0.keys,buildRowOpts=$__0.buildRowOpts,sortBy=$__0.sortBy,onSort=$__0.onSort;

    var headers = columns.map(function(col, idx)  {
      var event, className = 'sort-disabled';
      // Values that are not in the dataset are not sortable.
      if (col.sortable !== false && col.prop !== undefined) {
        event = onSort.bind(null, {
          prop: col.prop,
          order: getNextOrder(sortBy, col.prop)
        });
        className = getSortClass(sortBy, col.prop);
      }

      return (
        React.createElement("th", {
          ref: ("th-" + idx), 
          key: idx, 
          onClick: event, 
          style: {width: col.width}}, 
          col.title, 
          React.createElement("i", {className: ("sort-icon " + className)})
        )
      );
    });

    var getKeys = Array.isArray(keys) ? keyGetter(keys) : simpleGet(keys);
    var rows = this.props.dataArray.map(
      function(row) 
        {return React.createElement("tr", React.__spread({key: getKeys(row)},  buildRowOpts(row)), 
          columns.map(
            function(col, i) 
              {return React.createElement("td", {key: i, className: getCellClass(col, row)}, 
                getCellValue(col, row)
              );}
          )
        );});

    return (
      React.createElement("table", {className: this.props.className}, 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
            headers
          )
        ), 
        React.createElement("tbody", null, 
          rows.length ? rows :
            React.createElement("tr", null, React.createElement("td", {colSpan: 100, className: "text-center"}, "No data"))
        )
      )
    );
  }

});

module.exports = Table;
