/**
 * @flow
 */

import {ActionTypes} from './actions';

type Row = {[key: string]: string};

export type AppData = Array<Array<string> | Row>;

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
