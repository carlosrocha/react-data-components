var React = require('react/addons');

// Used to cancel events.
var preventDefault = e => e.preventDefault();

var ListButton = React.createClass({
  render() {
    var { className, event, children } = this.props;
    return (
      <li className={className}><a href="#" onClick={event}>{children}</a></li>
    );
  }
});

var Pagination = React.createClass({

  mixins: [ React.addons.PureRenderMixin ],

  propTypes: {
    onChangePage: React.PropTypes.func.isRequired,
    totalPages: React.PropTypes.number.isRequired,
    currentPage: React.PropTypes.number.isRequired,
    showPages: React.PropTypes.number
  },

  getDefaultProps() {
    return { showPages: 5 };
  },

  onChangePage(pageNumber, event) {
    event.preventDefault();
    this.props.onChangePage(pageNumber);
  },

  render() {
    var { totalPages, showPages, currentPage } = this.props;

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
        <ListButton
          key={i}
          className={btnClass}
          event={btnEvent}>
          {i + 1}
        </ListButton>
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
      <ul className={this.props.className}>
        <ListButton className={firstClass} event={firstHandler} />
        <ListButton className={prevClass} event={prevHandler} />
        {buttons}
        <ListButton className={nextClass} event={nextHandler} />
        <ListButton className={lastClass} event={lastHandler} />
      </ul>
    );
  }
});

module.exports = Pagination;
