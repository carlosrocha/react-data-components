var AppDispatcher = require('./AppDispatcher');
var {ActionTypes} = require('./AppConstants');

module.exports = {

  sort(sortBy) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.DATA_SORT,
      sortBy: sortBy
    });
  },

  changePageNumber(pageNumber) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.DATA_CHANGE_PAGE_NUMBER,
      pageNumber: pageNumber
    });
  },

  changePageSize(pageSize) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.DATA_CHANGE_PAGE_SIZE,
      pageSize: pageSize
    });
  },

  filter(filterName, filterValue) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.DATA_FILTER,
      filterName: filterName,
      filterValue: filterValue
    });
  }

};
