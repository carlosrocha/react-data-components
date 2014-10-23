/** @jsx React.DOM */
var React = require('react/addons');
var {contains} = require('./utils');
var cx = React.addons.classSet;
var {PropTypes} = React;

var Dropdown = React.createClass({

  propTypes: {
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired
    })).isRequired,
    label: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
    selected: PropTypes.any
  },

  getInitialState() {
    return { isOpen: false };
  },

  onClick() {
    this.setState({ isOpen: !this.state.isOpen });
  },

  onSelected(value) {
    var {selected, multiple, onSelected} = this.props;

    if (!multiple) {
      // If the same value is clicked twice then unselect
      onSelected(selected === value ? null : value);
      return;
    }

    var idx = selected.indexOf(value);
    if (idx >= 0) {
      selected.splice(idx, 1);
    } else {
      selected = selected.concat([ value ]);
    }
    onSelected(selected);
  },

  isSelected(value) {
    var {multiple, selected} = this.props;
    if (!multiple) return selected === value;
    return contains(selected, value);
  },

  render() {
    var {label, selected, options} = this.props;
    var compOptions = options.map(
      (each, i) =>
        <div
          key={i}
          className="dropdown-item"
          role="menuitem"
          onClick={this.onSelected.bind(this, each.value)}>
          <span>{each.label}</span>
          <span
            className="dropdown-itemcheck"
            style={{display: this.isSelected(each.value) ? 'block' : 'none'}}
          />
        </div>
    );
    var classNames = cx({
      'dropdown-list': true,
      'active': this.state.isOpen
    });
    return (
      <div className="dropdown">
        <button className="dropdown-btn" onClick={this.onClick} >
          {label} <span className="glyphicon glyphicon-chevron-down" />
        </button>
        <div className={classNames} role="menu">
          {compOptions}
        </div>
      </div>
    );
  }

});

module.exports = Dropdown;
