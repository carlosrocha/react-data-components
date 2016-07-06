/**
 * @flow
 */

import {sort, filter} from './utils';
import {ActionTypes} from './actions';
import type {State, Action, SortBy} from './types';

const filters = {
  globalSearch: {
    filter(a, b) {
      a = String(a).toLowerCase().trim();
      b = String(b).toLowerCase().trim();
      return b.indexOf(a) >= 0;
    },
  },
};

const initialState: State = {
  initialData: [],
  data: [],
  page: [],
  filterValues: { globalSearch: '' },
  totalPages: 1,
  sortBy: null,
  currentPage: 0,
  pageNumber: 0,
  pageSize: 5,
};

function calculatePage(data, pageSize, pageNumber) {
  const start = pageSize * pageNumber;
  return data.slice(start, start + pageSize);
}

function pageNumberChange(state, {value: pageNumber}) {
  return {
    ...state,
    pageNumber,
    page: calculatePage(state.data, state.pageSize, pageNumber),
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

function dataFilter(state, {value: {key, value}}) {
  const newFilterValues = { ...state.filterValues, [key]: value };
  let data = filter(filters, newFilterValues, state.initialData);
  if (state.sortBy) {
    data = sort(state.sortBy, data);
  }

  return {
    ...state,
    data,
    filterValues: newFilterValues,
    page: calculatePage(data, state.pageSize, state.pageNumber),
    pageNumber: 0,
    totalPages: Math.ceil(data.length / state.pageSize),
  };
}

function dataLoaded(state, {value: data}) {
  return {
    ...state,
    data,
    initialData: data,
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
