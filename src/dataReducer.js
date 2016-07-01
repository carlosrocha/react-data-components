/**
 * @flow
 */

import {sort, filter} from './utils';
import {ActionTypes} from './actions';
import type {State, Action, SortBy} from './types';

const containsIgnoreCase = (a, b) => {
  a = String(a).toLowerCase().trim();
  b = String(b).toLowerCase().trim();
  return b.indexOf(a) >= 0;
};

const filters = {
  globalSearch: {
    filter: containsIgnoreCase,
  },
};

const initialState = {
  data: [],
  page: [],
  filterValues: { globalSearch: '' },
  totalPages: 1,
  sortBy: {},
  currentPage: 0,
  pageNumber: 0,
  pageSize: 5,
};

function calculatePage(data, pageSize, pageNumber) {
  const start = pageSize * pageNumber;
  return data.slice(start, start + pageSize);
}

function pageNumberChange(state, {value: pageNumber}) {
  const {data, pageSize} = state;

  return {
    ...state,
    pageNumber,
    page: calculatePage(data, pageSize, pageNumber),
  };
}

function pageSizeChange(state, action) {
  const newPageSize = Number(action.value);
  const {pageNumber, pageSize} = state;
  const newPageNumber = Math.floor((pageNumber * pageSize) / newPageSize);

  return {
    ...state,
    page: calculatePage(state.data, newPageSize, newPageNumber),
    pageSize: newPageSize,
    pageNumber: newPageNumber,
    totalPages: Math.ceil(state.data.length / newPageSize),
  };
}

function dataSort(state, {value: sortBy}) {
  const data = sort(sortBy, state.data);

  return {
    ...state,
    sortBy,
    data,
    page: calculatePage(data, state.pageSize, state.pageNumber),
  };
}

function dataFilter(state, {value: [key, value]}) {
  const newFilterValues = { ...state.filterValues, [key]: value };
  let filtered = filter(filters, newFilterValues, state.data);
  filtered = sort(state.sortBy, filtered);

  return {
    ...state,
    filtered,
    filterValues: newFilterValues,
    page: calculatePage(filtered, state.pageSize, state.pageNumber),
  };
}

function dataLoaded(state, {value: data}) {
  return {
    ...state,
    data,
    page: calculatePage(data, state.pageSize, state.pageNumber),
    totalPages: Math.ceil(data.length / state.pageSize),
  };
}

export default function dataReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case ActionTypes.DATA_LOADED:
      return dataLoaded(state, action);

    case ActionTypes.PAGE_NUMBER_CHANGE:
      return pageNumberChange(state, action);

    case ActionTypes.PAGE_SIZE_CHANGE:
      return pageSizeChange(state, action);

    case ActionTypes.DATA_FILTER:
      return dataFilter(state, action);

    case ActionTypes.DATA_SORT:
      return dataSort(state, action);
  }

  return state;
}
