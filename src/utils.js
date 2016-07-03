function sortBy(data, prop) {
  return data.sort((rowA, rowB) => {
    const a = rowA[prop];
    const b = rowB[prop];

    if (a !== b) {
      if (a > b || a === undefined) return 1;
      if (a < b || b === undefined) return -1;
    }

    return 0;
  });
}

export function sort(sortByValues, data) {
  const sortedData = sortBy(data, sortByValues.prop);
  if (sortByValues.order === 'descending') {
    sortedData.reverse();
  }
  return sortedData;
}

function some(data, test) {
  if (Array.isArray(data)) {
    return data.some(test);
  } else {
    // Assume object.
    return Object.keys(data).some(key => test(data[key], key));
  }
}

/**
 * Example of filter and filterValues.
 * filters = { globalSearch: { filter: (a, b) => a === b } }
 * filterValues = { globalSearch: 'filter value' }
 */
export function filter(filters, filterValues, data) {
  return data.filter(row => some(filterValues, (filterValue, key) => {
    const {filter: f, prop} = filters[key];
    if (!prop) {
      // Filter is for all properties
      return some(row, value => f(filterValue, value));
    } else {
      // Filter is for one property
      return f(filterValue, row[prop]);
    }
  }));
}
