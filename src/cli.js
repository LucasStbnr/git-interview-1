'use strict';

const { DEMO_CART, total } = require('./cart');

const command = process.argv[2] || 'total';

if (command === 'total') {
  console.log('Total TTC : ' + total(DEMO_CART).toFixed(2) + ' EUR');
}
