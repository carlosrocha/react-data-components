/**
 * @flow
 */

import {ActionTypes} from './actions';

export type State = {
  data: Array<any>;
  page: Array<any>;
  sortBy: SortBy;
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

// FIXME: should be null from state.
export type SortBy = {
  prop?: string | number;
  order?: 'ascending' | 'descending';
};
