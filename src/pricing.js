'use strict';

const VAT_RATE = 0.2;

function applyVat(amountHt) {
  return amountHt * (1 + VAT_RATE);
}

function applyDiscount(amount, discountRate) {
  return amount - amount * discountRate;
}

module.exports = { VAT_RATE, applyVat, applyDiscount };
