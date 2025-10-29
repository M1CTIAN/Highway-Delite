const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  experience_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true
  },
  slot_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  user_email: {
    type: String,
    required: true
  },
  user_phone: {
    type: String
  },
  number_of_people: {
    type: Number,
    required: true,
    min: 1
  },
  promo_code: {
    type: String
  },
  discount_amount: {
    type: Number,
    default: 0
  },
  base_amount: {
    type: Number,
    required: true
  },
  final_amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  booking_reference: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

// Static method to generate booking reference
bookingSchema.statics.generateReference = function() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `BK${timestamp}${random}`;
};

// Static method to find booking by reference with populated data
bookingSchema.statics.findByReference = async function(reference) {
  const booking = await this.findOne({ booking_reference: reference })
    .populate('experience_id')
    .populate('slot_id')
    .lean();
    
  if (!booking) return null;
  
  return {
    ...booking,
    id: booking._id,
    experience_title: booking.experience_id?.title,
    experience_location: booking.experience_id?.location,
    experience_image: booking.experience_id?.image_url,
    slot_date: booking.slot_id?.date,
    time_slot: booking.slot_id?.time_slot
  };
};

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
