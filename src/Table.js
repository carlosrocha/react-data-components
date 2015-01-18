var React = require('react');

var simpleGet = key => data => data[key];
var keyGetter = keys => data => keys.map(key => data[key]);

var isEmpty = value => value === undefined || value === null || value === '';

var getSortOrder =
  (sortBy, prop) =>
    sortBy.prop === prop ?
      // If the property is the same as the property being sorted,
      // then it must be asc or desc.
      (sortBy.order === 'asc' ? 'ascending' : 'descending') :
      // Otherwise it's off.
      'none';

var getCellValue =
  ({ prop, defaultContent, render }, row) =>
    // Return `defaultContent` if the value is empty.
    !isEmpty(prop) && isEmpty(row[prop]) ? defaultContent :
      // Use the render function for the value.
      render ? render(row[prop], row) :
      // Otherwise just return the value.
      row[prop];

var getCellClass =
  ({ prop, className }, row) =>
    !isEmpty(prop) && isEmpty(row[prop]) ? 'empty-cell' :
      typeof className === 'function' ? className(row[prop], row) :
      className;

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
      var sortProps, order, nextOrder, sortEvent;
      // Only add sorting events if the column has a property and is sortable.
      if (col.sortable !== false && 'prop' in col) {
        order = getSortOrder(sortBy, col.prop);
        nextOrder = order === 'ascending' ? 'descending' : 'ascending';
        sortEvent = onSort.bind(null, {
          prop: col.prop,
          order: order === 'ascending' ? 'desc' : 'asc'
        });
        sortProps = {
          'onClick': sortEvent,
          // Fire the sort event on enter.
          'onKeyDown': e => { if (e.keyCode === 13) sortEvent(); },
          // Prevents selection with mouse.
          'onMouseDown': e => e.preventDefault(),
          'tabIndex': 0,
          'className': `sort-${order}`,
          'aria-sort': order === 'none' ? null : order,
          'aria-label': `${col.title}: activate to sort column ${nextOrder}`
        };
      }

      return (
        <th
          ref={`th-${idx}`}
          key={idx}
          style={{width: col.width}}
          {...sortProps}>
          {col.title}
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
