var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var $__0=  require('./utils'),contains=$__0.contains;

var Dropdown = React.createClass({displayName: 'Dropdown',

  propTypes: {
    options: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      value: React.PropTypes.any.isRequired
    })).isRequired,
    label: React.PropTypes.string.isRequired,
    multiple: React.PropTypes.bool,
    selected: React.PropTypes.any
  },

  componentDidMount:function() {
    window.addEventListener('click', this.hideOnBlur);
  },

  componentWillUnmount:function() {
    window.removeEventListener('click', this.hideOnBlur);
  },

  hideOnBlur:function(e) {
    // Do not hide if the event is inside the container.
    if (this.getDOMNode().contains(e.target)) {
      return;
    }

    this.setState({ isOpen: false });
  },

  getInitialState:function() {
    return { isOpen: false };
  },

  toggleOpen:function() {
    this.setState({ isOpen: !this.state.isOpen });
  },

  onSelected:function(value) {
    var $__0=    this.props,selected=$__0.selected,multiple=$__0.multiple,onSelected=$__0.onSelected;
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

  isSelected:function(value) {
    var $__0=   this.props,multiple=$__0.multiple,selected=$__0.selected;
    if (!multiple) return selected === value;
    return contains(selected, value);
  },

  render:function() {
    var $__0=    this.props,label=$__0.label,selected=$__0.selected,options=$__0.options;
    var compOptions = options.map(
      function(each, i) 
        {return React.createElement("div", {
          key: i, 
          className: "dropdown-item", 
          role: "menuitem", 
          onClick: this.onSelected.bind(this, each.value)}, 
          React.createElement("span", null, each.label), 
          React.createElement("span", {
            className: "dropdown-itemcheck", 
            style: {display: this.isSelected(each.value) ? 'block' : 'none'}}
          )
        );}.bind(this)
    );

    return (
      React.createElement("div", {className: "dropdown"}, 
        React.createElement("button", {className: "dropdown-btn", onClick: this.toggleOpen}, 
          label, " ", React.createElement("span", {className: "glyphicon glyphicon-chevron-down"})
        ), 
        React.createElement(ReactCSSTransitionGroup, {transitionName: "fade", transitionEnter: false}, 
          this.state.isOpen ? React.createElement("div", {key: "menu", className: "dropdown-list", role: "menu"}, 
            compOptions
          ) : null
        )
      )
    );
  }

});

module.exports = Dropdown;
