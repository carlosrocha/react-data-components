(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react/addons"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react/addons"], factory);
	else if(typeof exports === 'object')
		exports["ReactDataComponents"] = factory(require("react"), require("react/addons"));
	else
		root["ReactDataComponents"] = factory(root["react"], root["react/addons"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */exports.DataTable = __webpack_require__(1);
	exports.Table = __webpack_require__(2);
	exports.TableHeader = __webpack_require__(3);
	exports.Pagination = __webpack_require__(4);
	exports.SortMixin = __webpack_require__(5);
	exports.PageMixin = __webpack_require__(6);
	exports.FilterMixin = __webpack_require__(7);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(8);
	var Table = __webpack_require__(2);
	var Pagination = __webpack_require__(4);
	var SelectField = __webpack_require__(10);
	var SearchField = __webpack_require__(11);

	var SortMixin = __webpack_require__(5);
	var PageMixin = __webpack_require__(6);
	var FilterMixin = __webpack_require__(7);

	var DataTable = React.createClass({displayName: 'DataTable',

	  mixins: [ SortMixin, PageMixin, FilterMixin ],

	  getInitialState:function() {
	    return {
	      // Clone the initialData.
	      data: this.props.initialData.slice(0)
	    };
	  },

	  render:function() {
	    var page = this.buildPage();

	    return this.transferPropsTo(
	      React.DOM.div(null, 
	        React.DOM.div({className: "pull-left"}, 
	          SelectField({
	            id: "page-menu", 
	            label: "Page size:", 
	            value: this.state.pageLength, 
	            options: this.props.pageLengthOptions, 
	            onChange: this.onPageLengthChange}
	          ), 
	          SearchField({
	            id: "search-field", 
	            label: "Search:", 
	            value: this.state.filterValues['globalSearch'], 
	            onChange: this.onFilter.bind(this, 'globalSearch')}
	          )
	        ), 
	        Pagination({
	          className: "pagination pull-right", 
	          currentPage: page.currentPage, 
	          totalPages: page.totalPages, 
	          onChangePage: this.onChangePage}
	        ), 
	        Table({
	          className: "table table-bordered", 
	          dataArray: page.data, 
	          columns: this.props.columns, 
	          keys: this.props.keys, 
	          sortBy: this.state.sortBy, 
	          onSort: this.onSort}
	        )
	      )
	    );
	  }
	});

	module.exports = DataTable;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(8);
	var TableHeader = __webpack_require__(3);
	var $__0=    __webpack_require__(12),isFunc=$__0.isFunc,isEmpty=$__0.isEmpty,keyGetter=$__0.keyGetter;

	function mapData(columns, data, getKeys, rowClicked, selected) {
	  var result = [];

	  for (var i = 0; i < data.length; i++) {
	    var row = [];
	    var currentData = data[i];

	    for (var j = 0; j < columns.length; j++) {
	      var def = columns[j];
	      var value = currentData[def.prop];
	      var className = def.className;

	      // If prop is defined then it was expecting a value from the data.
	      if (def.prop && isEmpty(value)) {
	        value = def.defaultContent;
	        className = 'empty-cell';
	      }

	      if (def.render) {
	        value = def.render(value, currentData);
	      }

	      if (isFunc(className)) {
	        className = className(value, currentData);
	      }

	      row.push(React.DOM.td({key: j, className: className}, value));
	    }

	    // Use the key to keep track of the selection
	    var key = getKeys(currentData).join(',');
	    var rowClass = selected === key ? 'active' : null;
	    var rowClickedEvent = rowClicked ?
	        rowClicked.bind(null, currentData, key) : null;
	    result.push(
	      React.DOM.tr({
	        key: key, 
	        className: rowClass, 
	        onClick: rowClickedEvent}, 
	        row
	      )
	    );
	  }

	  return result;
	}

	var emptyRow = React.DOM.tr(null, React.DOM.td({colSpan: 100, className: "text-center"}, "No data"));

	var Table = React.createClass({displayName: 'Table',

	  propTypes: {
	    columns:   React.PropTypes.array.isRequired,
	    dataArray: React.PropTypes.array.isRequired
	  },

	  render:function() {
	    var $__0=      this.props,columns=$__0.columns,keys=$__0.keys,dataArray=$__0.dataArray,onRowClicked=$__0.onRowClicked,selected=$__0.selected;
	    var getKeys = keyGetter(keys);
	    var rows = mapData(columns, dataArray, getKeys, onRowClicked, selected);

	    return this.transferPropsTo(
	      React.DOM.table(null, 
	        TableHeader({
	          columns: columns, 
	          sortBy: this.props.sortBy, 
	          onSort: this.props.onSort}
	        ), 
	        React.DOM.tbody(null, 
	          rows.length ? rows : emptyRow
	        )
	      )
	    );
	  }

	});

	module.exports = Table;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(9);

	function sortClass(sortBy, prop) {
	  if (!sortBy || sortBy.prop !== prop || !sortBy.order) {
	    return 'sort-off';
	  }
	  return sortBy.order === 'asc' ? 'sort-asc' : 'sort-desc';
	}

	var TableHeader = React.createClass({displayName: 'TableHeader',

	  mixins: [ React.addons.PureRenderMixin ],

	  propTypes: {
	    columns: React.PropTypes.array.isRequired,
	    sortBy:  React.PropTypes.object,
	    onSort:  React.PropTypes.func
	  },

	  componentDidMount:function() {
	    // If no width was specified, then set the width that the browser applied
	    // initially to avoid recalculating width between pages.
	    for (var i = 0; i < this.props.columns.length; i++) {
	      var thDom = this.refs['th-' + i].getDOMNode();
	      if (!thDom.style.width) {
	        thDom.style.width = thDom.offsetWidth + 'px';
	      }
	    }
	  },

	  render:function() {
	    var $__0=    this.props,sortBy=$__0.sortBy,onSort=$__0.onSort,columns=$__0.columns;
	    var headers = columns.map(function(col, idx)  {

	      var event, className = 'sort-disabled';
	      // Values that are not in the dataset are not sortable.
	      if (col.sortable !== false && col.prop !== undefined) {
	        event = onSort.bind(null, col.prop)
	        className = sortClass(sortBy, col.prop);
	      }

	      return (
	        React.DOM.th({
	          ref: 'th-' + idx, 
	          key: idx, 
	          onClick: event, 
	          style: {width: col.width}}, 
	          col.title, 
	          React.DOM.i({className: className})
	        )
	      );
	    });

	    return (
	      React.DOM.thead(null, 
	        React.DOM.tr(null, 
	          headers
	        )
	      )
	    );
	  }

	});

	module.exports = TableHeader;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(9);
	var cx = React.addons.classSet;

	/**
	 * Used to cancel events.
	 */
	var returnFalse = function()  {return false;};

	var ListButton = React.createClass({displayName: 'ListButton',

	  render:function() {
	    return (
	      React.DOM.li({className: this.props.className}, 
	        React.DOM.a({href: "#", onClick: this.props.event}, this.props.children)
	      )
	    );
	  }

	});

	/**
	 * Pagination component.
	 */
	var Pagination = React.createClass({displayName: 'Pagination',

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

	  getDefaultProps:function() {
	    return {
	      showPages: 5
	    };
	  },

	  onChangePage:function(pageNumber) {
	    this.props.onChangePage(pageNumber);
	    return false;
	  },

	  render:function() {
	    var $__0=    this.props,totalPages=$__0.totalPages,showPages=$__0.showPages,currentPage=$__0.currentPage;
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
	        ListButton({
	          key: i, 
	          className: btnClass, 
	          event: btnEvent}, 
	          i + 1
	        )
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
	      React.DOM.ul(null, 
	        ListButton({
	          className: firstClass, 
	          event: firstHandler}
	        ), 
	        ListButton({
	          className: prevClass, 
	          event: prevHandler}
	        ), 
	        buttons, 
	        ListButton({
	          className: nextClass, 
	          event: nextHandler}
	        ), 
	        ListButton({
	          className: lastClass, 
	          event: lastHandler}
	        )
	      )
	    );
	  }
	});

	module.exports = Pagination;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var $__0=  __webpack_require__(12),sortByFunc=$__0.sortByFunc;

	function sort(sortBy, data) {
	  var sortedData = data.sort(sortByFunc(sortBy.prop));
	  if (sortBy.order === 'desc') {
	    sortedData.reverse();
	  }
	  return sortedData;
	}

	module.exports = {

	  getInitialState:function() {
	    return { sortBy: this.props.initialSortBy };
	  },

	  componentWillMount:function() {
	    // Do the initial sorting if specified.
	    var $__0=   this.state,sortBy=$__0.sortBy,data=$__0.data;
	    if (sortBy) {
	      this.setState({ data: sort(sortBy, data) });
	    }
	  },

	  onSort:function(prop) {
	    var $__0=   this.state,sortBy=$__0.sortBy,data=$__0.data;

	    // If no state before or it was sorting on another column, then initialize on null.
	    var prevOrder = !sortBy || sortBy.prop !== prop ? null : sortBy.order;

	    // Move to the next sorting order.
	    var nextOrder = !prevOrder || prevOrder === 'desc' ? 'asc' : 'desc';
	    var nextSortBy = { prop: prop, order: nextOrder };

	    // Perform the sort.
	    var sortedData = sort(nextSortBy, data);

	    this.setState({
	      sortBy: nextSortBy,
	      data: sortedData
	    });
	  }

	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */module.exports = {

	  getDefaultProps:function() {
	    return {
	      initialPageLength: 10,
	      pageLengthOptions: [ 5, 10, 20 ]
	    };
	  },

	  getInitialState:function() {
	    return {
	      currentPage: 0,
	      pageLength: this.props.initialPageLength
	    };
	  },

	  buildPage:function() {
	    var $__0=    this.state,data=$__0.data,currentPage=$__0.currentPage,pageLength=$__0.pageLength;
	    var start = pageLength * currentPage;

	    return {
	      data: data.slice(start, start + pageLength),
	      currentPage: currentPage,
	      totalPages: Math.ceil(data.length / pageLength)
	    };
	  },

	  onChangePage:function(pageNumber) {
	    this.setState({ currentPage: pageNumber });
	  },

	  onPageLengthChange:function(e) {
	    var newPageLength = +e.target.value;
	    var pageNumber = this.state.currentPage;
	    var dataLength = this.state.data.length;

	    // Check if the new page length does not conflict with the page number
	    if ((newPageLength * pageNumber) >= dataLength) {
	      pageNumber = Math.ceil(dataLength / newPageLength) - 1;
	    }

	    this.setState({
	      pageLength: newPageLength,
	      currentPage: pageNumber
	    });
	  }

	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var $__0=   __webpack_require__(12),some=$__0.some,containsIgnoreCase=$__0.containsIgnoreCase;

	function filterPass(filters, row) {
	  return function(filterValue, key) {
	    var filterDef = filters[key];
	    var partial = filterDef.filter.bind(null, filterValue);
	    if (!filterDef.prop) {
	      // Filter is for all properties
	      return !some(function(each)  {return partial(each);}, row);
	    } else {
	      // Filter is for one property
	      return !partial(row[filterDef.prop]);
	    }
	  };
	}

	module.exports = {

	  getInitialState:function() {
	    return { filterValues: {} };
	  },

	  getDefaultProps:function() {
	    return {
	      filters: {
	        globalSearch: {
	          filter: containsIgnoreCase
	        }
	      }
	    };
	  },

	  onFilter:function(prop, e) {
	    var $__0=  this.state,filterValues=$__0.filterValues;
	    var $__1=   this.props,initialData=$__1.initialData,filters=$__1.filters;
	    var filterValue = e.target.value;

	    if (filterValue) {
	      filterValues[prop] = filterValue;
	    } else {
	      delete filterValues[prop];
	    }

	    var filterFunc = filterPass.bind(null, filters);
	    var newData = initialData.filter(
	      function(each)  {return !some(filterFunc(each), filterValues);}
	    );

	    this.setState({
	      data: newData,
	      filterValues: filterValues,
	      currentPage: 0
	    });
	  }

	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(8);

	var SelectField = React.createClass({displayName: 'SelectField',

	  render:function() {
	    var $__0=      this.props,id=$__0.id,options=$__0.options,label=$__0.label,value=$__0.value,onChange=$__0.onChange;
	    var mappedOpts =
	      options.map(function(each)  {return React.DOM.option({key: each, value: each}, each);});

	    return (
	      React.DOM.div(null, 
	        React.DOM.label({htmlFor: id}, label), 
	        React.DOM.select({id: id, value: value, onChange: onChange}, 
	          mappedOpts
	        )
	      )
	    );
	  }

	});

	module.exports = SelectField;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(8);

	var SearchField = React.createClass({displayName: 'SearchField',

	  render:function() {
	    return (
	      React.DOM.div(null, 
	        React.DOM.label({htmlFor: this.props.id}, this.props.label), 
	        React.DOM.input({
	          id: this.props.id, 
	          type: "search", 
	          value: this.props.value, 
	          onChange: this.props.onChange}
	        )
	      )
	    );
	  }

	});

	module.exports = SearchField;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//**
	 * @param {string} a
	 * @return {boolean}
	 */
	exports.containsIgnoreCase = function(a, b) {
	  a = (a + '').toLowerCase().trim();
	  b = (b + '').toLowerCase().trim();
	  return b.indexOf(a) >= 0;
	};

	exports.some = function(pred, obj) {
	  // TODO: support for arrays
	  for (var key in obj) {
	    if (pred(obj[key], key) === true) {
	      return true;
	    }
	  }
	  return false;
	};

	/**
	 * @param {object} obj the object to check.
	 * @return {boolean} true if the object is a function, false otherwise.
	 */
	exports.isFunc = function(obj)  {return typeof obj === 'function';};

	/**
	 * Creates a function to get keys of objects.
	 * @param {array} keys Array of keys to get.
	 * @return {function} takes the data to get the keys from.
	 */
	exports.keyGetter = function(keys)  {return function(data)  {return keys.map(function(key)  {return data[key];});};};

	/**
	 * @return {boolean} true if the value is empty.
	 */
	exports.isEmpty = function(val)  {return val === undefined || val === null || val === '';};

	/**
	 * Creates a function with a property to sort on.
	 * @param {string} the property
	 * @return {function}
	 */
	exports.sortByFunc =
	    function(prop) 
	        {return function(a, b)  {return a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0;};};



/***/ }
/******/ ])
});
