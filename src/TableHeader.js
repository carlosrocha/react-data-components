var React = require('react/addons');

function sortClass(sortBy, prop) {
  if (!sortBy || sortBy.prop !== prop || !sortBy.order) {
    return 'sort-off';
  }
  return sortBy.order === 'asc' ? 'sort-asc' : 'sort-desc';
}

var TableHeader = React.createClass({

  mixins: [ React.addons.PureRenderMixin ],

  propTypes: {
    columns: React.PropTypes.array.isRequired,
    sortBy:  React.PropTypes.object,
    onSort:  React.PropTypes.func
  },

  componentDidMount() {
    // If no width was specified, then set the width that the browser applied
    // initially to avoid recalculating width between pages.
    for (var i = 0; i < this.props.columns.length; i++) {
      var thDom = this.refs['th-' + i].getDOMNode();
      if (!thDom.style.width) {
        thDom.style.width = thDom.offsetWidth + 'px';
      }
    }
  },

  render() {
    var {sortBy, onSort, columns} = this.props;
    var headers = columns.map((col, idx) => {

      var event, className = 'sort-disabled';
      // Values that are not in the dataset are not sortable.
      if (col.sortable !== false && col.prop !== undefined) {
        event = onSort.bind(null, col.prop)
        className = sortClass(sortBy, col.prop);
      }

      return (
        <th
          ref={'th-' + idx}
          key={idx}
          onClick={event}
          style={{width: col.width}}>
          {col.title}
          <i className={className} />
        </th>
      );
    });

    return (
      <thead>
        <tr>
          {headers}
        </tr>
      </thead>
    );
  }

});

module.exports = TableHeader;
