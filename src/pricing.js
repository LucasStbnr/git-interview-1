'use strict';

// Regles de calcul des prix : TVA, arrondis et remises.

const VAT_RATE = 0.196;

function round2(value) {
  return Math.round(value * 100) / 100;
}

function applyVat(amountHt) {
  return round2(amountHt * (1 + VAT_RATE));
}

function applyDiscount(amount, discountRate) {
  return amount - amount * discountRate;
}

module.exports = {
  VAT_RATE,
  round2,
  applyVat,
  applyDiscount,
};
