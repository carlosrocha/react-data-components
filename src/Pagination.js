/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var ListButton = require('./ListButton');

/**
 * Used to cancel events.
 */
var returnFalse = function() { return false; };

/**
 * Pagination component.
 */
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

  getDefaultProps: function() {
    return {
      showPages: 5
    };
  },

  onChangePage: function(pageNumber) {
    this.props.onChangePage(pageNumber);
    return false;
  },

  render: function() {
    var totalPages = this.props.totalPages,
        showPages = this.props.showPages,
        currentPage = this.props.currentPage,
        diff = Math.floor(showPages / 2),
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
        btnEvent = returnFalse;
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
    var firstHandler = returnFalse,
        prevHandler = returnFalse,
        firstClass = 'disabled';
    if (currentPage > 0) {
      firstClass = null;
      firstHandler = this.onChangePage.bind(this, 0);
      prevHandler = this.onChangePage.bind(this, currentPage - 1);
    }

    // Next and Last button handlers and class
    var nextHandler = returnFalse,
        lastHandler = returnFalse,
        lastClass = 'disabled';
    if (currentPage < totalPages - 1) {
      lastClass = null;
      nextHandler = this.onChangePage.bind(this, currentPage + 1);
      lastHandler = this.onChangePage.bind(this, totalPages - 1);
    }

    return this.transferPropsTo(
      <ul>
        <ListButton
          className={firstClass}
          event={firstHandler}>
          First
        </ListButton>
        <ListButton
          className={firstClass}
          event={prevHandler}>
          Prev
        </ListButton>
        {buttons}
        <ListButton
          className={lastClass}
          event={nextHandler}>
          Next
        </ListButton>
        <ListButton
          className={lastClass}
          event={lastHandler}>
          Last
        </ListButton>
      </ul>
    );
  }
});

module.exports = Pagination;
