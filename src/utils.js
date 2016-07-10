import type {SortBy, AppData} from './types';

function sortCompareFunction(prop, desc, rowA, rowB) {
  const a = rowA[prop];
  const b = rowB[prop];

  if (a !== b) {
    if (a > b || a === undefined) return desc ? -1 : 1;
    if (a < b || b === undefined) return desc ? 1 : -1;
  }

  return 0;
}

export function sort({prop, order}: SortBy, data: AppData) {
  const sortFunction =
    sortCompareFunction.bind(null, prop, order === 'descending');
  return data.sort(sortFunction);
}

function some(data, test) {
  if (Array.isArray(data)) {
    return data.some(test);
  } else {
    // Assume object.
    for (let key in data) {
      if (test(data[key], key, data)) {
        return true;
      }
    }
    return false;
  }
}

export function filter(filters, filterValues, data) {
  const filterAndVals = {};
  for (let key in filterValues) {
    filterAndVals[key] = {
      value: filterValues[key],
      filter: filters[key].filter,
    };
  }

  return data.filter(
    row => some(
      filterAndVals,
      ({filter, value, prop}) => {
        if (!prop) {
          return some(row, filter.bind(null, value));
        } else {
          return filter(value, row[key]);
        }
      }
    )
  );
}

export function containsIgnoreCase(a, b) {
  a = String(a).toLowerCase().trim();
  b = String(b).toLowerCase().trim();
  return b.indexOf(a) >= 0;
}
