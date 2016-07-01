jest.unmock('../dataReducer');
jest.unmock('../utils');
jest.unmock('../actions');
jest.unmock('lodash.sortby');

import dataReducer from '../dataReducer';
import {pageNumberChange, pageSizeChange, dataSort} from '../actions';

const data = [ [1, 2], [3, 4] ];

describe('dataReducer', () => {

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
      data: [ [3, 4], [1, 2] ],
      page: [ [3, 4] ],
      pageNumber: 0,
      pageSize: 1,
      totalPages: 2,
    };
    const sortBy = { prop: 0, order: 'ascending' };
    const action = dataSort(sortBy);
    const expected = {
      ...state,
      sortBy,
      data: [ [1, 2], [3, 4] ],
      page: [ [1, 2] ],
    };

    expect(dataReducer(state, action)).toEqual(expected);
  });

  it('sorts descending', () => {
    const state = {
      data: [ [1, 2], [3, 4] ],
      page: [ [1, 2] ],
      pageNumber: 0,
      pageSize: 1,
      totalPages: 2,
    };
    const sortBy = { prop: 0, order: 'descending' };
    const action = dataSort(sortBy);
    const expected = {
      ...state,
      sortBy,
      data: [ [3, 4], [1, 2] ],
      page: [ [3, 4] ],
    };

    expect(dataReducer(state, action)).toEqual(expected);
  });

});
