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

function formatMoney(amount) {
  return amount.toFixed(2) + ' EUR';
}

const command = process.argv[2] || 'total';

if (command === 'total') {
  console.log('Total TTC : ' + formatMoney(total(DEMO_CART)));
} else if (command === 'list') {
  DEMO_CART.forEach(function (item) {
    console.log(item.sku + ' x' + item.quantity + ' - ' + item.label);
  });
} else if (command === 'help') {
  console.log(HELP);
} else {
  console.error('Commande inconnue : ' + command);
  console.error(HELP);
  process.exit(1);
}
