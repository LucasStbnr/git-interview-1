'use strict';

const fs = require('fs');
const path = require('path');
const { DEMO_CART, total, summary } = require('./cart');

const HELP = [
  'shopctl - calcul de panier',
  '',
  'Commandes :',
  '  total     affiche le total TTC du panier',
  '  list      liste les articles du panier',
  '  summary   resume le panier',
  '  version   affiche la version courante',
  '  help      affiche cette aide',
  '',
  'Options :',
  '  --empty   simule un panier vide',
].join('\n');

function formatMoney(amount) {
  return amount.toFixed(2) + ' EUR';
}

function readVersion() {
  return fs.readFileSync(path.join(__dirname, '..', 'VERSION'), 'utf8').trim();
}

const command = process.argv[2] || 'total';
const cart = process.argv.includes('--empty') ? [] : DEMO_CART;

if (command === 'total') {
  console.log('Total TTC : ' + formatMoney(total(cart)));
} else if (command === 'list') {
  cart.forEach(function (item) {
    console.log(item.sku + ' x' + item.quantity + ' - ' + item.label);
  });
} else if (command === 'summary') {
  console.log(summary(cart));
} else if (command === 'version') {
  console.log('shopctl ' + readVersion());
} else if (command === 'help') {
  console.log(HELP);
} else {
  console.error('Commande inconnue : ' + command);
  console.error(HELP);
  process.exit(1);
}
