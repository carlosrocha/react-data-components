var React = require('react/addons');

// Used to cancel events.
var preventDefault = (ev) => ev.preventDefault();

var ListButton = React.createClass({
  render() {
    return (
      <li className={this.props.className}>
        <a href="#" onClick={this.props.event}>{this.props.children}</a>
      </li>
    );
  }
});

var Pagination = React.createClass({

  mixins: [ React.addons.PureRenderMixin ],

  propTypes: {
    /**
     * Event to trigger. Receives the page number.
     */
    onChangePage: React.PropTypes.func.isRequired,

    /**
     * Total number of pages.
     */
    totalPages: React.PropTypes.number.isRequired,

    /**
     * Current page being displayed.
     */
    currentPage: React.PropTypes.number.isRequired,

    /**
     * The number of pages to show. 5 by default.
     */
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
        start = currentPage - diff,
        end = currentPage + diff + 1;

    // Edge cases
    if (totalPages < showPages) {
      start = 0;
      end = totalPages;
    } else if (start <= 0) {
      start = 0;
      end = showPages;
    } else if (end >= totalPages) {
      start = totalPages - showPages;
      end = totalPages;
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
