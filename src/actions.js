/**
 * @flow
 */

import type {Action, SortBy, Value, Filters} from './types';

export const ActionTypes = {
  DATA_LOADED: 'DATA_LOADED',
  PAGE_NUMBER_CHANGE: 'PAGE_NUMBER_CHANGE',
  PAGE_SIZE_CHANGE: 'PAGE_SIZE_CHANGE',
  DATA_FILTER: 'DATA_FILTER',
  DATA_SORT: 'DATA_SORT',
};

export function pageNumberChange(value: number): Action {
  return { value, type: ActionTypes.PAGE_NUMBER_CHANGE };
}

export function pageSizeChange(value: number): Action {
  return { value, type: ActionTypes.PAGE_SIZE_CHANGE };
}

export function dataSort(value: SortBy): Action {
  return { value, type: ActionTypes.DATA_SORT };
}

export function dataLoaded(value: Array<any>): Action {
  return { value, type: ActionTypes.DATA_LOADED };
}

// Probably a bad idea to send down `filters` here.
export function dataFilter(
  key: string,
  value: Value,
  filters: Filters
): Action {
  return { value: {key, value, filters}, type: ActionTypes.DATA_FILTER };
}
