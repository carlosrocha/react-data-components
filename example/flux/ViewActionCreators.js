var Dispatcher = require('./Dispatcher');
var {ActionTypes} = require('./AppConstants');

module.exports = {

  sort(sortBy) {
    Dispatcher.dispatch({
      type: ActionTypes.DATA_SORT,
      sortBy: sortBy
    });
  },

  changePageNumber(pageNumber) {
    Dispatcher.dispatch({
      type: ActionTypes.DATA_CHANGE_PAGE_NUMBER,
      pageNumber: pageNumber
    });
  },

  changePageSize(pageSize) {
    Dispatcher.dispatch({
      type: ActionTypes.DATA_CHANGE_PAGE_SIZE,
      pageSize: pageSize
    });
  },

  filter(filterName, filterValue) {
    Dispatcher.dispatch({
      type: ActionTypes.DATA_FILTER,
      filterName: filterName,
      filterValue: filterValue
    });
  }

};
