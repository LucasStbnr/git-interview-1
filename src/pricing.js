'use strict';

// Regles de calcul des prix : TVA, arrondis et remises.

const VAT_RATE = 0.196;

function round2(value) {
  return Math.round(value * 100) / 100;
}

function applyVat(amountHt) {
  return round2(amountHt * (1 + VAT_RATE));
}

// Une remise ne peut jamais depasser 50 pourcent du montant.
const MAX_DISCOUNT_RATE = 0.5;

function applyDiscount(amount, discountRate) {
  const rate = Math.min(discountRate, MAX_DISCOUNT_RATE);
  return amount - amount * rate;
}

module.exports = {
  VAT_RATE,
  round2,
  applyVat,
  applyDiscount,
};
