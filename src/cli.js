'use strict';

const fs = require('fs');
const path = require('path');
const { DEMO_CART, total } = require('./cart');

const HELP = [
  'shopctl - calcul de panier',
  '',
  'Commandes :',
  '  total     affiche le total TTC du panier',
  '  list      liste les articles du panier',
  '  version   affiche la version courante',
  '  help      affiche cette aide',
].join('\n');

function formatMoney(amount) {
  return amount.toFixed(2) + ' EUR';
}

function readVersion() {
  return fs.readFileSync(path.join(__dirname, '..', 'VERSION'), 'utf8').trim();
}

const command = process.argv[2] || 'total';

if (command === 'total') {
  console.log('Total TTC : ' + formatMoney(total(DEMO_CART)));
} else if (command === 'list') {
  DEMO_CART.forEach(function (item) {
    console.log(item.sku + ' x' + item.quantity + ' - ' + item.label);
  });
} else if (command === 'version') {
  console.log('shopctl ' + readVersion());
} else if (command === 'help') {
  console.log(HELP);
} else {
  console.error('Commande inconnue : ' + command);
  console.error(HELP);
  process.exit(1);
}
