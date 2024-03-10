'use strict';

const { DEMO_CART, total } = require('./cart');

const HELP = [
  'shopctl - calcul de panier',
  '',
  'Commandes :',
  ' total  affiche le total TTC du panier',
  ' list  liste les articles du panier',
  ' help  affiche cette aide',
].join('\n');

const command = process.argv[2] || 'total';

if (command === 'total') {
  console.log('Total TTC : ' + total(DEMO_CART).toFixed(2) + ' EUR');
} else if (command === 'list') {
  DEMO_CART.forEach(function (item) {
    console.log(item.sku + ' x' + item.quantity + ' - ' + item.label);
  });
} else if (command === 'help') {
  console.log(HELP);
}
