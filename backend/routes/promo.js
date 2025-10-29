const express = require('express');
const router = express.Router();
const promoController = require('../controllers/promoController');
const { body } = require('express-validator');

// POST /api/promo/validate - Validate promo code
router.post(
  '/validate',
  [
    body('code').trim().notEmpty().withMessage('Promo code is required'),
    body('amount').isFloat({ min: 0 }).withMessage('Valid amount is required')
  ],
  promoController.validatePromoCode
);

module.exports = router;
