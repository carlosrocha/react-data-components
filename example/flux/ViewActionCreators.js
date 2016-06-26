import Dispatcher from './Dispatcher';
import { ActionTypes } from './AppConstants';

export function sort(sortBy) {
  Dispatcher.dispatch({
    type: ActionTypes.DATA_SORT,
    sortBy: sortBy,
  });
}

export function changePageNumber(pageNumber) {
  Dispatcher.dispatch({
    type: ActionTypes.DATA_CHANGE_PAGE_NUMBER,
    pageNumber: pageNumber,
  });
}

export function changePageSize(pageSize) {
  Dispatcher.dispatch({
    type: ActionTypes.DATA_CHANGE_PAGE_SIZE,
    pageSize: pageSize,
  });
}

export function filter(filterName, filterValue) {
  Dispatcher.dispatch({
    type: ActionTypes.DATA_FILTER,
    filterName: filterName,
    filterValue: filterValue,
  });
}
