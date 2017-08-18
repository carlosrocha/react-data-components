const _ = require('lodash');
const orderBy = require('lodash/orderBy');
// import some from 'lodash/some';

function isNumber(item) {
  let isnum = /^\d+$/.test(item);
  return isnum;
}

function are_all_numbers(data, key) {
  let values = _.map(data, key);
  return _.every(values, isNumber);
}

let data = [
  { DATE: '2017-08-18', COUNT: '65', EVENT_NAME: 'TAX_EXEMPTION_FAILURE' },
  { DATE: '2017-08-18', COUNT: '63', EVENT_NAME: 'FRAUD_NOT_DONE' },
  { DATE: '2017-08-18', COUNT: '4451', EVENT_NAME: 'FRAUD_ACCEPT' },
];

let order = 'descending';

let all_are_numbers = are_all_numbers(data, 'COUNT');
console.log('all_are_numbers:');
console.log(all_are_numbers);

// https://stackoverflow.com/questions/37848030/lodash-how-to-do-a-case-insensitive-sorting-on-a-collection-using-orderby
// if (all_are_numbers) {
let orderByResults = orderBy(data, [item => parseInt(item.COUNT)], ['desc']);
// } else {
//     var orderByResults = orderBy(
//       data,
//       prop,
//       order === 'descending' ? 'desc' : 'asc'
//     );
// }

console.log(orderByResults);
