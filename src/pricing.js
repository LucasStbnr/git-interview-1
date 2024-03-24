'use strict';

// Regles de calcul des prix : TVA, arrondis et remises.

const VAT_RATE = 0.196;

const PROMO_CODES = {
  SUMMER20: 0.2,
  BLACKFRIDAY: 0.7,
};

function round2(value) {
  return Math.round(value * 100) / 100;
}

function promoRate(code) {
  return PROMO_CODES[code] || 0;
}

function applyVat(amountHt) {
  return round2(amountHt * (1 + VAT_RATE));
}

function applyDiscount(amount, discountRate, promoCode) {
  const rate = discountRate + promoRate(promoCode);
  return amount - amount * rate;
}

module.exports = {
  VAT_RATE,
  PROMO_CODES,
  round2,
  promoRate,
  applyVat,
  applyDiscount,
};
