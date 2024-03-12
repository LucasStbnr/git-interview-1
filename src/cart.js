'use strict';

const { applyVat, applyDiscount } = require('./pricing');

const DEMO_CART = [
  { sku: 'TSHIRT-M', label: 'T-shirt', unitPrice: 20, quantity: 2 },
  { sku: 'MUG-01', label: 'Mug', unitPrice: 12, quantity: 5 },
];

function findItem(items, sku) {
  return items.find((item) => item.sku === sku) || null;
}

function subtotal(items) {
  let sum = 0;
  for (const item of items) {
    sum += item.unitPrice * item.quantity;
  }
  return sum;
}

function total(items, discountRate) {
  return applyVat(applyDiscount(subtotal(items), discountRate || 0));
}

module.exports = { DEMO_CART, findItem, subtotal, total };
