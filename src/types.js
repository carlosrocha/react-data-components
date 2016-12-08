/**
 * @flow
 */

import {ActionTypes} from './actions';

export type Value = string | number;

export type Filters = {
  [name: string]: {
    filter: (a: Value, b: Value) => Boolean;
  };
};

export type Row = {[key: string]: string} | Array<string>;

export type AppData = Array<Row>;

export type State = {
  name: string;
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
  name: string;
};

export type SortBy = {
  prop: Value;
  order: 'ascending' | 'descending';
};
