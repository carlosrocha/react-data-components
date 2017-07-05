/**
 * @flow
 */

import type { Action, Domain, SortBy, Value, Filters } from './types';

export const ActionTypes = {
  DATA_LOADED: 'DATA_LOADED',
  PAGE_NUMBER_CHANGE: 'PAGE_NUMBER_CHANGE',
  PAGE_SIZE_CHANGE: 'PAGE_SIZE_CHANGE',
  DATA_FILTER: 'DATA_FILTER',
  DATA_SORT: 'DATA_SORT',
};
export const DOMAIN: Domain = 'react-data-components';

export function pageNumberChange(
  value: number,
  domain: string = DOMAIN,
): Action {
  return { value, type: ActionTypes.PAGE_NUMBER_CHANGE, meta: { domain } };
}

export function pageSizeChange(value: number, domain: string = DOMAIN): Action {
  return { value, type: ActionTypes.PAGE_SIZE_CHANGE, meta: { domain } };
}

export function dataSort(value: SortBy, domain: string = DOMAIN): Action {
  return { value, type: ActionTypes.DATA_SORT, meta: { domain } };
}

export function dataLoaded(value: Array<any>, domain: string = DOMAIN): Action {
  return { value, type: ActionTypes.DATA_LOADED, meta: { domain } };
}

// Probably a bad idea to send down `filters` here.
export function dataFilter(
  key: string,
  value: Value,
  filters: Filters,
  domain: string = DOMAIN,
): Action {
  return {
    value: { key, value, filters },
    type: ActionTypes.DATA_FILTER,
    meta: { domain },
  };
}
