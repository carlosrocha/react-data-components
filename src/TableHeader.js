/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var closure = require('./utils').closure;

var sortClass = function(sortBy, prop) {
  if (!sortBy || sortBy.prop !== prop || !sortBy.order) {
    return 'sort-off';
  }
  return sortBy.order === 'asc' ? 'sort-asc' : 'sort-desc';
};

var TableHeader = React.createClass({
  mixins: [ React.addons.PureRenderMixin ],

  propTypes: {
    columns: React.PropTypes.array.isRequired,
    sortBy: React.PropTypes.object,
    onSort: React.PropTypes.func.isRequired
  },

  componentDidMount: function() {
    // If no width was specified, then set the width that the browser applied
    // initially to avoid recalculating width between pages.
    for (var i = 0; i < this.props.columns.length; i++) {
      var thDom = this.refs['th-' + i].getDOMNode();
      if (!thDom.style.width) {
        thDom.style.width = thDom.offsetWidth + 'px';
      }
    }
  },

  render: function() {
    var sortBy = this.props.sortBy;
    var onSort = closure(this.props.onSort);
    var headers = this.props.columns.map(function(col, idx) {

      var event, className = 'sort-disabled';
      // Values that are not in the dataset are not sortable.
      if (col.sortable !== false && col.prop) {
        //event = this.onSort.bind(this, col.prop);
        event = onSort(col.prop);
        className = sortClass(sortBy, col.prop);
      }

      return (
        <th
          ref={'th-' + idx}
          key={idx}
          onClick={event}
          style={{width: col.width}}
          className={className}>
          {col.title}
          <i />
        </th>
      );
    }, this);

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
