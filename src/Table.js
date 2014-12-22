var React = require('react');

var simpleGet = key => data => data[key];
var keyGetter = keys => data => keys.map(key => data[key]);

var isEmpty = value => value === undefined || value === null || value === '';
var isFunc = value => typeof value === 'function';

var getSortClass =
  (sortBy, prop) =>
    sortBy.prop === prop ?
      (sortBy.order === 'asc' ? 'sort-asc' : 'sort-desc') :
      'sort-off';

var getNextOrder =
  (sortBy, prop) =>
    sortBy.prop === prop && sortBy.order === 'asc' ? 'desc' : 'asc';

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

  getDefaultProps() {
    return {
      buildRowOpts: () => ({}),
      sortBy: {}
    };
  },

  componentDidMount() {
    // If no width was specified, then set the width that the browser applied
    // initially to avoid recalculating width between pages.
    for (var i = 0; i < this.props.columns.length; i++) {
      var thDom = this.refs[`th-${i}`].getDOMNode();
      if (!thDom.style.width) {
        thDom.style.width = `${thDom.offsetWidth}px`;
      }
    }
  },

  render() {
    var { columns, keys, buildRowOpts, sortBy, onSort } = this.props;

    var headers = columns.map((col, idx) => {
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
        <th
          ref={`th-${idx}`}
          key={idx}
          onClick={event}
          style={{width: col.width}}>
          {col.title}
          <i className={`sort-icon ${className}`} />
        </th>
      );
    });

    var getKeys = Array.isArray(keys) ? keyGetter(keys) : simpleGet(keys);
    var rows = this.props.dataArray.map(
      row =>
        <tr key={getKeys(row)} {...buildRowOpts(row)}>
          {columns.map(
            (col, i) =>
              <td key={i} className={getCellClass(col, row)}>
                {getCellValue(col, row)}
              </td>
          )}
        </tr>);

    return (
      <table className={this.props.className}>
        <thead>
          <tr>
            {headers}
          </tr>
        </thead>
        <tbody>
          {rows.length ? rows :
            <tr><td colSpan={100} className="text-center">No data</td></tr>}
        </tbody>
      </table>
    );
  }

});

module.exports = Table;
