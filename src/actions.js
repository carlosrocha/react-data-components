/**
 * @flow
 */

import type { Action, SortBy, Value, Filters } from './types';

export const DOMAIN = 'react-data-components';
export const ActionTypes = {
  DATA_LOADED: `@@${DOMAIN}/DATA_LOADED`,
  INITIALIZE: `@@${DOMAIN}/INITIALIZE`,
  PAGE_NUMBER_CHANGE: `@@${DOMAIN}/PAGE_NUMBER_CHANGE`,
  PAGE_SIZE_CHANGE: `@@${DOMAIN}/PAGE_SIZE_CHANGE`,
  DATA_FILTER: `@@${DOMAIN}/DATA_FILTER`,
  DATA_SORT: `@@${DOMAIN}/DATA_SORT`,
};

type DataFilterAction = {
  type: string,
  meta: { table: string },
  payload: { key: string, value: Value, filters: Filters },
} & Action;

type DataLoadedAction = {
  type: string,
  meta: { table: string },
  payload: Array<any>,
} & Action;

type DataSortAction = {
  type: string,
  meta: { table: string },
  payload: SortBy,
} & Action;

type InitializeAction = {
  type: string,
  meta: { table: string },
  payload: Array<any>,
} & Action;

type PageNumberChangeAction = {
  type: string,
  meta: { table: string },
  payload: number,
} & Action;

type PageSizeChangeAction = {
  type: string,
  meta: { table: string },
  payload: number,
} & Action;

export const initialize = (
  data: Array<any> = [],
  table: string,
): InitializeAction => ({
  type: ActionTypes.INITIALIZE,
  payload: data,
  meta: { table },
});

// Probably a bad idea to send down `filters` here.
export const dataFilter = (
  key: string,
  value: Value,
  filters: Filters,
  table: string,
): DataFilterAction => ({
  type: ActionTypes.DATA_FILTER,
  payload: { key, value, filters },
  meta: { table },
});

export const dataSort = (sortBy: SortBy, table: string): DataSortAction => ({
  type: ActionTypes.DATA_SORT,
  payload: sortBy,
  meta: { table },
});

export const dataLoaded = (
  data: Array<any>,
  table: string,
): DataLoadedAction => ({
  type: ActionTypes.DATA_LOADED,
  payload: data,
  meta: { table },
});

export const pageNumberChange = (
  pageNumber: number,
  table: string,
): PageNumberChangeAction => ({
  type: ActionTypes.PAGE_NUMBER_CHANGE,
  payload: pageNumber,
  meta: { table },
});

export const pageSizeChange = (
  pageSize: number,
  table: string,
): PageSizeChangeAction => ({
  type: ActionTypes.PAGE_SIZE_CHANGE,
  payload: pageSize,
  meta: { table },
});
