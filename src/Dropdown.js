var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var { contains } = require('./utils');

var Dropdown = React.createClass({

  propTypes: {
    options: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      value: React.PropTypes.any.isRequired
    })).isRequired,
    label: React.PropTypes.string.isRequired,
    multiple: React.PropTypes.bool,
    selected: React.PropTypes.any
  },

  componentDidMount() {
    window.addEventListener('click', this.hideOnBlur);
  },

  componentWillUnmount() {
    window.removeEventListener('click', this.hideOnBlur);
  },

  hideOnBlur(e) {
    // Do not hide if the event is inside the container.
    if (this.getDOMNode().contains(e.target)) {
      return;
    }

    this.setState({ isOpen: false });
  },

  getInitialState() {
    return { isOpen: false };
  },

  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  },

  onSelected(value) {
    var { selected, multiple, onSelected } = this.props;
    this.toggleOpen();

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
    var { multiple, selected } = this.props;
    if (!multiple) return selected === value;
    return contains(selected, value);
  },

  render() {
    var { label, selected, options } = this.props;
    var compOptions = options.map(
      (each, i) =>
        <li
          key={i}
          className="dropdown-item"
          role="menuitem"
          onClick={this.onSelected.bind(this, each.value)}>
          <span>{each.label}</span>
          <span
            className="dropdown-itemcheck"
            style={{display: this.isSelected(each.value) ? 'block' : 'none'}}
          />
        </li>
    );

    return (
      <div className="dropdown">
        <button className="dropdown-btn" onClick={this.toggleOpen} >
          {label} <span className="fa fa-angle-down" />
        </button>
        <ReactCSSTransitionGroup transitionName="fade" transitionEnter={false}>
          {this.state.isOpen ? <ul key="menu" className="dropdown-list" role="menu">
            {compOptions}
          </ul> : null}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

});

module.exports = Dropdown;
