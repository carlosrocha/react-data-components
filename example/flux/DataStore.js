var AppDispatcher = require('./AppDispatcher');
var { ActionTypes } = require('./AppConstants');
var { EventEmitter } = require('events');
var { sort, filter } = require('react-data-components').utils;
var assign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';
var _rawData = [];
var _data = {};
var initVals = {
  filtered: [],
  page: [],
  filterValues: {},
  sortBy: {},
  totalPages: 0,
  pageNumber: 0
};

function _buildPage() {
  var { pageSize, pageNumber, filtered } = _data;
  var start = pageSize * pageNumber;

  _data.page = filtered.slice(start, start + pageSize);
  _data.totalPages = Math.ceil(filtered.length / pageSize);
}

var DataStore = assign(EventEmitter.prototype, {

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  init(config) {
    var merged = assign(initVals, config);
    _data = merged;
  },

  getData() {
    return _data;
  }

});

AppDispatcher.register(payload => {
  var action = payload.action;

  switch (action.type) {

    case ActionTypes.DATA_RECEIVE:
      _rawData = action.data;
      _data.filtered = sort(_data.sortBy, action.data);
      break;

    case ActionTypes.DATA_SORT:
      _data.sortBy = action.sortBy;
      _data.filtered = sort(action.sortBy, _data.filtered);
      break;

    case ActionTypes.DATA_CHANGE_PAGE_NUMBER:
      _data.pageNumber = action.pageNumber;
      break;

    case ActionTypes.DATA_CHANGE_PAGE_SIZE:
      var { pageSize } = action;
      _data.pageNumber =
          Math.floor((_data.pageNumber * _data.pageSize) / pageSize);
      _data.pageSize = pageSize;
      break;

    case ActionTypes.DATA_FILTER:
      var { filterName, filterValue } = action;
      _data.filterValues[filterName] = filterValue;
      _data.filtered = filter(_data.filters, _data.filterValues, _rawData);
      _data.filtered = sort(_data.sortBy, _data.filtered);
      _data.pageNumber = 0;
      break;

    default:
      return;
  }

  _buildPage();
  DataStore.emitChange();

});

module.exports = DataStore;
