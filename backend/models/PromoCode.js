const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  discount_type: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discount_value: {
    type: Number,
    required: true
  },
  max_discount: {
    type: Number
  },
  min_purchase: {
    type: Number
  },
  valid_from: {
    type: Date
  },
  valid_until: {
    type: Date
  },
  is_active: {
    type: Boolean,
    default: true
  },
  usage_limit: {
    type: Number
  },
  usage_count: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Static method to find valid promo code
promoCodeSchema.statics.findByCode = async function(code) {
  const now = new Date();
  
  const promo = await this.findOne({
    code: code.toUpperCase(),
    is_active: true,
    $or: [
      { valid_from: null },
      { valid_from: { $lte: now } }
    ],
    $or: [
      { valid_until: null },
      { valid_until: { $gte: now } }
    ],
    $or: [
      { usage_limit: null },
      { $expr: { $lt: ['$usage_count', '$usage_limit'] } }
    ]
  });
  
  return promo;
};

// Static method to calculate discount
promoCodeSchema.statics.calculateDiscount = function(promo, amount) {
  let discount = 0;

  if (promo.discount_type === 'percentage') {
    discount = (amount * promo.discount_value) / 100;
    if (promo.max_discount && discount > promo.max_discount) {
      discount = promo.max_discount;
    }
  } else if (promo.discount_type === 'fixed') {
    discount = promo.discount_value;
  }

  return Math.min(discount, amount);
};

// Static method to increment usage
promoCodeSchema.statics.incrementUsage = async function(code) {
  return await this.findOneAndUpdate(
    { code: code.toUpperCase() },
    { $inc: { usage_count: 1 } },
    { new: true }
  );
};

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);

module.exports = PromoCode;
