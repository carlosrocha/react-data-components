var React = require('react/addons');

// Used to cancel events.
var preventDefault = function(e)  {return e.preventDefault();};

var ListButton = React.createClass({displayName: "ListButton",
  render:function() {
    var $__0=      this.props,className=$__0.className,event=$__0.event,children=$__0.children;
    return (
      React.createElement("li", {className: className}, React.createElement("a", {href: "#", onClick: event}, children))
    );
  }
});

var Pagination = React.createClass({displayName: "Pagination",

  mixins: [ React.addons.PureRenderMixin ],

  propTypes: {
    onChangePage: React.PropTypes.func.isRequired,
    totalPages: React.PropTypes.number.isRequired,
    currentPage: React.PropTypes.number.isRequired,
    showPages: React.PropTypes.number
  },

  getDefaultProps:function() {
    return { showPages: 5 };
  },

  onChangePage:function(pageNumber, event) {
    event.preventDefault();
    this.props.onChangePage(pageNumber);
  },

  render:function() {
    var $__0=      this.props,totalPages=$__0.totalPages,showPages=$__0.showPages,currentPage=$__0.currentPage;

    if (totalPages === 0) {
      return null;
    }

    var diff = Math.floor(showPages / 2),
        start = Math.max(currentPage - diff, 0),
        end = Math.min(start + showPages, totalPages);

    if (totalPages >= showPages && end >= totalPages) {
      start = totalPages - showPages;
    }

    var buttons = [], btnClass, btnEvent;
    for (var i = start; i < end; i++) {
      // If the button is for the current page then disable the event.
      if (currentPage === i) {
        btnClass = 'active';
        btnEvent = preventDefault;
      } else {
        btnClass = null;
        btnEvent = this.onChangePage.bind(this, i);
      }
      buttons.push(
        React.createElement(ListButton, {
          key: i, 
          className: btnClass, 
          event: btnEvent}, 
          i + 1
        )
      );
    }

    // First and Prev button handlers and class
    var firstHandler = preventDefault, firstClass = 'first disabled';
    var prevHandler = preventDefault, prevClass = 'prev disabled';
    if (currentPage > 0) {
      firstHandler = this.onChangePage.bind(this, 0);
      firstClass = 'first';
      prevHandler = this.onChangePage.bind(this, currentPage - 1);
      prevClass = 'prev';
    }

    // Next and Last button handlers and class
    var nextHandler = preventDefault, nextClass = 'next disabled';
    var lastHandler = preventDefault, lastClass = 'last disabled';
    if (currentPage < totalPages - 1) {
      nextHandler = this.onChangePage.bind(this, currentPage + 1);
      nextClass = 'next';
      lastHandler = this.onChangePage.bind(this, totalPages - 1);
      lastClass = 'last';
    }

    return (
      React.createElement("ul", {className: this.props.className}, 
        React.createElement(ListButton, {className: firstClass, event: firstHandler}), 
        React.createElement(ListButton, {className: prevClass, event: prevHandler}), 
        buttons, 
        React.createElement(ListButton, {className: nextClass, event: nextHandler}), 
        React.createElement(ListButton, {className: lastClass, event: lastHandler})
      )
    );
  }
});

module.exports = Pagination;
