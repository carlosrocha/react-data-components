const _ = require('lodash');
const orderBy = require('lodash/orderBy');

let data = [
  {
    '7 Days Prior': '512',
    '% Deviation - 7 days prior': '-49%',
    '1 Day Prior': '399',
    '% Deviation - 1 day prior': '-34%',
    Application: 'order-ui',
  },
  {
    '7 Days Prior': '302187',
    '% Deviation - 7 days prior': '-12%',
    '1 Day Prior': '276618',
    '% Deviation - 1 day prior': '-4%',
    Application: 'customer-account-service',
  },
  {
    '7 Days Prior': '19958',
    '% Deviation - 7 days prior': '-14%',
    '1 Day Prior': '21929',
    '% Deviation - 1 day prior': '-22%',
    Application: 'mylist-service',
  },
  {
    '7 Days Prior': '24',
    '% Deviation - 7 days prior': '45%',
    '1 Day Prior': '92',
    '% Deviation - 1 day prior': '-62%',
    Application: 'mylist-ui',
  },
  {
    '7 Days Prior': '145',
    '% Deviation - 7 days prior': '-26%',
    '1 Day Prior': '160',
    '% Deviation - 1 day prior': '-33%',
    Application: 'customer-ui',
  },
  {
    '7 Days Prior': '31030',
    '% Deviation - 7 days prior': '-7%',
    '1 Day Prior': '20241',
    '% Deviation - 1 day prior': '43%',
    Application: 'common-ui',
  },
  {
    '7 Days Prior': '36331',
    '% Deviation - 7 days prior': '-11%',
    '1 Day Prior': '33793',
    '% Deviation - 1 day prior': '-5%',
    Application: 'order-service',
  },
];

let orderByResults = orderBy(data, 'Application', ['desc']);

console.log(data);
console.log('\n\n\n\n');
console.log(orderByResults);
