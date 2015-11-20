import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

let simpleGet = key => data => data[key];
let keyGetter = keys => data => keys.map(key => data[key]);

let isEmpty = value => value == null || value === '';

let getCellValue =
  ({ prop, defaultContent, render }, row) =>
    // Return `defaultContent` if the value is empty.
    !isEmpty(prop) && isEmpty(row[prop]) ? defaultContent :
      // Use the render function for the value.
      render ? render(row[prop], row) :
      // Otherwise just return the value.
      row[prop];

let getCellClass =
  ({ prop, className }, row) =>
    !isEmpty(prop) && isEmpty(row[prop]) ? 'empty-cell' :
      typeof className == 'function' ? className(row[prop], row) :
      className;

function buildSortProps(col, sortBy, onSort) {
  let order = sortBy.prop === col.prop ? sortBy.order : 'none';
  let nextOrder = order === 'ascending' ? 'descending' : 'ascending';
  let sortEvent = onSort.bind(null, { prop: col.prop, order: nextOrder });

  return {
    'onClick': sortEvent,
    // Fire the sort event on enter.
    'onKeyDown': e => { if (e.keyCode === 13) sortEvent(); },
    // Prevents selection with mouse.
    'onMouseDown': e => e.preventDefault(),
    'tabIndex': 0,
    'aria-sort': order,
    'aria-label': `${col.title}: activate to sort column ${nextOrder}`,
  };
}

export default class Table extends Component {

  constructor(props) {
    super(props);
    this._headers = [];
  }

  static defaultProps = {
    buildRowOptions: () => ({}),
    sortBy: {},
  };

  static propTypes = {
    keys: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]).isRequired,

    columns: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      prop: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      render: PropTypes.func,
      sortable: PropTypes.bool,
      defaultContent: PropTypes.string,
      width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]),
    })).isRequired,

    dataArray: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ])).isRequired,

    buildRowOptions: PropTypes.func,

    sortBy: PropTypes.shape({
      prop: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      order: PropTypes.oneOf([ 'ascending', 'descending' ]),
    }),

    onSort: PropTypes.func,
  };

  componentDidMount() {
    // If no width was specified, then set the width that the browser applied
    // initially to avoid recalculating width between pages.
    this._headers.forEach(header => {
      let thDom = ReactDOM.findDOMNode(header);
      if (!thDom.style.width) {
        thDom.style.width = `${thDom.offsetWidth}px`;
      }
    });
  }

  render() {
    let { columns, keys, buildRowOptions, sortBy, onSort } = this.props;

    let headers = columns.map((col, idx) => {
      let sortProps, order;
      // Only add sorting events if the column has a property and is sortable.
      if (typeof onSort == 'function' &&
          col.sortable !== false &&
          'prop' in col) {
        sortProps = buildSortProps(col, sortBy, onSort);
        order = sortProps['aria-sort'];
      }

      return (
        <th
          ref={c => this._headers[idx] = c}
          key={idx}
          style={{width: col.width}}
          role="columnheader"
          scope="col"
          {...sortProps}>
          <span>{col.title}</span>
          {typeof order != 'undefined' ?
            <span className={`sort-icon sort-${order}`} aria-hidden="true" /> :
            null}
        </th>
      );
    });

    let getKeys = Array.isArray(keys) ? keyGetter(keys) : simpleGet(keys);
    let rows = this.props.dataArray.map(
      row =>
        <tr key={getKeys(row)} {...buildRowOptions(row)}>
          {columns.map(
            (col, i) =>
              <td key={i} className={getCellClass(col, row)}>
                {getCellValue(col, row)}
              </td>
          )}
        </tr>
    );

    return (
      <table {...this.props}>
        <caption className="sr-only" role="alert" aria-live="polite">
          {`Sorted by ${sortBy.prop}: ${sortBy.order} order`}
        </caption>
        <thead>
          <tr>
            {headers}
          </tr>
        </thead>
        <tbody>
          {rows.length ? rows :
            <tr>
              <td colSpan={columns.length} className="text-center">No data</td>
            </tr>}
        </tbody>
      </table>
    );
  }

}
