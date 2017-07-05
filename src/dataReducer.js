/**
 * @flow
 */

import { sort, filter } from './utils';
import { ActionTypes, DOMAIN } from './actions';
import type { State, Action, SortBy } from './types';

const initialState: State = {
  initialized: false,
  initialData: [],
  data: [],
  page: [],
  filterValues: { globalSearch: '' },
  totalPages: 0,
  sortBy: null,
  pageNumber: 0,
  pageSize: 5,
};

function calculatePage(data, pageSize, pageNumber) {
  if (pageSize === 0 || !data.length) {
    return { page: data, totalPages: 0 };
  }

  const start = pageSize * pageNumber;

  return {
    page: data.slice(start, start + pageSize),
    totalPages: Math.ceil(data.length / pageSize),
  };
}

function pageNumberChange(state, { payload: pageNumber }) {
  return {
    ...state,
    ...calculatePage(state.data, state.pageSize, pageNumber),
    pageNumber,
  };
}

function pageSizeChange(state, action) {
  const newPageSize = Number(action.payload);
  const { pageNumber, pageSize } = state;
  const newPageNumber = newPageSize
    ? Math.floor(pageNumber * pageSize / newPageSize)
    : 0;

  return {
    ...state,
    ...calculatePage(state.data, newPageSize, newPageNumber),
    pageSize: newPageSize,
    pageNumber: newPageNumber,
  };
}

function dataSort(state, { payload: sortBy }) {
  const data = sort(sortBy, state.data);

  return {
    ...state,
    ...calculatePage(data, state.pageSize, state.pageNumber),
    sortBy,
    data,
  };
}

function dataFilter(state, { payload: { key, value, filters } }) {
  const newFilterValues = { ...state.filterValues, [key]: value };
  let data = filter(filters, newFilterValues, state.initialData);

  if (state.sortBy) {
    data = sort(state.sortBy, data);
  }

  return {
    ...state,
    ...calculatePage(data, state.pageSize, 0),
    data,
    filterValues: newFilterValues,
    pageNumber: 0,
  };
}

function dataInit(state, action) {
  const { payload } = action;

  return {
    ...state,
    initialized: true,
    initialData: payload,
    data: payload,
  };
}

function dataLoaded(state, { payload: data }) {
  // Filled missing properties.
  const filledState = { ...initialState, ...state };
  const { pageSize, pageNumber } = filledState;

  if (state.sortBy) {
    data = sort(state.sortBy, data);
  }

  return {
    ...filledState,
    ...calculatePage(data, pageSize, pageNumber),
    initialData: data,
    data,
  };
}

export function dataReducer(
  state: State = initialState,
  action: Action,
): State {
  switch (action.type) {
    case ActionTypes.INITIALIZE:
      return dataInit(state, action);

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

export default function tableReducer(state: Object = {}, action: Action) {
  switch (action.type) {
    case ActionTypes.INITIALIZE:
    case ActionTypes.DATA_LOADED:
    case ActionTypes.PAGE_NUMBER_CHANGE:
    case ActionTypes.PAGE_SIZE_CHANGE:
    case ActionTypes.DATA_FILTER:
    case ActionTypes.DATA_SORT: {
      const { meta: { table } } = action;

      return {
        ...state,
        [table]: dataReducer(state[table], action),
      };
    }
  }

  return state;
}
