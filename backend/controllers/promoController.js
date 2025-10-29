const PromoCode = require('../models/PromoCode');

const promoController = {
  // POST /api/promo/validate - Validate a promo code
  validatePromoCode: async (req, res) => {
    try {
      const { code, amount } = req.body;

      if (!code || !amount) {
        return res.status(400).json({
          success: false,
          message: 'Promo code and amount are required'
        });
      }

      const promo = await PromoCode.findByCode(code);

      if (!promo) {
        return res.status(404).json({
          success: false,
          message: 'Invalid or expired promo code'
        });
      }

      // Check minimum purchase requirement
      if (promo.min_purchase && amount < promo.min_purchase) {
        return res.status(400).json({
          success: false,
          message: `Minimum purchase amount of ₹${promo.min_purchase} required`,
          min_purchase: promo.min_purchase
        });
      }

      // Calculate discount
      const discount = PromoCode.calculateDiscount(promo, amount);

      res.status(200).json({
        success: true,
        message: 'Promo code is valid',
        data: {
          code: promo.code,
          discount_type: promo.discount_type,
          discount_value: promo.discount_value,
          discount_amount: discount,
          final_amount: amount - discount
        }
      });

    } catch (error) {
      console.error('Error validating promo code:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to validate promo code',
        error: error.message
      });
    }
  }
};

module.exports = promoController;
