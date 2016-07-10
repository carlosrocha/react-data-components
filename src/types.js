/**
 * @flow
 */

import {ActionTypes} from './actions';

export type Row = {[key: string]: string} | Array<string>;

export type AppData = Array<Row>;

export type State = {
  initialData: AppData;
  data: AppData;
  page: AppData;
  sortBy: ?SortBy;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  filterValues: {
    [key: string]: string;
  };
};

export type Action = {
  type: $Keys<typeof ActionTypes>;
  value: any;
};

export type SortBy = {
  prop: string | number;
  order: 'ascending' | 'descending';
};
