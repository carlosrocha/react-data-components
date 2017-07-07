import { dataReducer } from '../dataReducer';
import {
  pageNumberChange,
  pageSizeChange,
  dataSort,
  dataFilter,
  dataLoaded,
} from '../actions';
import { containsIgnoreCase } from '../utils';

const data = [[1, 2], [3, 4]];

const filters = {
  globalSearch: { filter: containsIgnoreCase },
};

describe('dataReducer', () => {
  it('loads data', () => {
    const action = dataLoaded(data);
    const expected = {
      data,
      initialized: false,
      initialData: data,
      page: data,
      filterValues: { globalSearch: '' },
      sortBy: null,
      pageNumber: 0,
      pageSize: 5,
      totalPages: 1,
    };

    expect(dataReducer(undefined, action)).toEqual(expected);
  });

  it('changes page number', () => {
    const state = {
      data,
      page: data.slice(0, 1),
      pageNumber: 0,
      pageSize: 1,
    };
    const action = pageNumberChange(1);
    const expected = {
      ...state,
      page: data.slice(1, 2),
      pageNumber: 1,
      totalPages: 2,
    };

    expect(dataReducer(state, action)).toEqual(expected);
  });

  it('changes page size', () => {
    const state = {
      data,
      page: data.slice(0, 1),
      pageNumber: 0,
      pageSize: 1,
    };
    const action = pageSizeChange(2);
    const expected = {
      ...state,
      page: data,
      pageSize: 2,
      totalPages: 1,
    };

    expect(dataReducer(state, action)).toEqual(expected);
  });

  it('sorts descending', () => {
    const state = {
      data: [[3, 4], [1, 2]],
      page: [[3, 4]],
      pageNumber: 0,
      pageSize: 1,
      totalPages: 2,
    };
    const sortBy = { prop: 0, order: 'ascending' };
    const action = dataSort(sortBy);
    const expected = {
      ...state,
      sortBy,
      data: [[1, 2], [3, 4]],
      page: [[1, 2]],
    };

    expect(dataReducer(state, action)).toEqual(expected);
  });

  it('sorts descending', () => {
    const state = {
      data: [[1, 2], [3, 4]],
      page: [[1, 2]],
      pageNumber: 0,
      pageSize: 1,
      totalPages: 2,
    };
    const sortBy = { prop: 0, order: 'descending' };
    const action = dataSort(sortBy);
    const expected = {
      ...state,
      sortBy,
      data: [[3, 4], [1, 2]],
      page: [[3, 4]],
    };

    expect(dataReducer(state, action)).toEqual(expected);
  });

  it('filters', () => {
    const data = [['carlos', 'r'], [3, 4]];
    const state = {
      data,
      initialData: data,
      page: data.slice(0, 1),
      pageNumber: 0,
      pageSize: 1,
      totalPages: 2,
    };
    const action = dataFilter('globalSearch', 'c', filters);
    const expected = {
      ...state,
      filterValues: { globalSearch: 'c' },
      data: [['carlos', 'r']],
      page: [['carlos', 'r']],
      totalPages: 1,
    };

    expect(dataReducer(state, action)).toEqual(expected);
  });

  it('filters on different page', () => {
    const data = [['carlos', 'r'], [3, 4]];
    const state = {
      data,
      initialData: data,
      page: data.slice(0, 1),
      pageSize: 1,
      totalPages: 2,
    };
    const initState = {
      ...state,
      pageNumber: 1,
    };
    const action = dataFilter('globalSearch', 'c', filters);
    const expected = {
      ...state,
      pageNumber: 0,
      filterValues: { globalSearch: 'c' },
      data: [['carlos', 'r']],
      page: [['carlos', 'r']],
      totalPages: 1,
    };

    expect(dataReducer(state, action)).toEqual(expected);
  });
});
