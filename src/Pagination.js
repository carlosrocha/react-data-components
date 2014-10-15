var React = require('react/addons');
var cx = require('react/lib/cx');

/**
 * Used to cancel events.
 */
var returnFalse = () => false;

var ListButton = React.createClass({

  render() {
    return (
      <li className={this.props.className}>
        <a href="#" onClick={this.props.event}>{this.props.children}</a>
      </li>
    );
  }

});

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

  getDefaultProps() {
    return {
      showPages: 5
    };
  },

  onChangePage(pageNumber) {
    this.props.onChangePage(pageNumber);
    return false;
  },

  render() {
    var {totalPages, showPages, currentPage} = this.props;
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
    var isFirst = currentPage === 0;
    var firstHandler = isFirst ? returnFalse : this.onChangePage.bind(this, 0);
    var firstClass = cx({
      'first': true,
      'disabled': isFirst
    });
    var prevHandler = isFirst ? returnFalse : this.onChangePage.bind(this, currentPage - 1);
    var prevClass = cx({
      'prev': true,
      'disabled': isFirst
    });

    // Next and Last button handlers and class
    var isLast = currentPage === (totalPages - 1);
    var nextHandler = isLast ? returnFalse : this.onChangePage.bind(this, currentPage + 1);
    var nextClass = cx({
      'next': true,
      'disabled': isLast
    });
    var lastHandler = isLast ? returnFalse : this.onChangePage.bind(this, totalPages - 1);
    var lastClass = cx({
      'last': true,
      'disabled': isLast
    });

    return this.transferPropsTo(
      <ul>
        <ListButton
          className={firstClass}
          event={firstHandler}
        />
        <ListButton
          className={prevClass}
          event={prevHandler}
        />
        {buttons}
        <ListButton
          className={nextClass}
          event={nextHandler}
        />
        <ListButton
          className={lastClass}
          event={lastHandler}
        />
      </ul>
    );
  }
});

module.exports = Pagination;
