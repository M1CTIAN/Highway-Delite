const Booking = require('../models/Booking');
const Slot = require('../models/Slot');
const Experience = require('../models/Experience');
const PromoCode = require('../models/PromoCode');

const bookingController = {
  // POST /api/bookings - Create a new booking
  createBooking: async (req, res) => {
    try {
      const {
        experience_id,
        slot_id,
        user_name,
        user_email,
        user_phone,
        number_of_people,
        promo_code
      } = req.body;

      // Validate required fields
      if (!experience_id || !slot_id || !user_name || !user_email || !number_of_people) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }

      // Verify experience exists
      const experience = await Experience.findById(experience_id);
      if (!experience) {
        return res.status(404).json({
          success: false,
          message: 'Experience not found'
        });
      }

      // Verify slot exists and has availability
      const slot = await Slot.findById(slot_id);
      if (!slot) {
        return res.status(404).json({
          success: false,
          message: 'Slot not found'
        });
      }

      if (slot.available_spots < number_of_people) {
        return res.status(400).json({
          success: false,
          message: 'Not enough available spots',
          available: slot.available_spots
        });
      }

      // Calculate base amount
      const base_amount = parseFloat(slot.price) * parseInt(number_of_people);
      let discount_amount = 0;
      let final_amount = base_amount;

      // Apply promo code if provided
      if (promo_code) {
        const promo = await PromoCode.findByCode(promo_code);
        
        if (!promo) {
          return res.status(400).json({
            success: false,
            message: 'Invalid promo code'
          });
        }

        if (promo.min_purchase && base_amount < promo.min_purchase) {
          return res.status(400).json({
            success: false,
            message: `Minimum purchase amount of ₹${promo.min_purchase} required for this promo code`
          });
        }

        discount_amount = PromoCode.calculateDiscount(promo, base_amount);
        final_amount = base_amount - discount_amount;

        // Increment promo code usage
        await PromoCode.incrementUsage(promo_code);
      }

      // Update slot availability
      slot.available_spots -= number_of_people;
      await slot.save();

      // Generate booking reference
      const booking_reference = Booking.generateReference();

      // Create booking
      const booking = await Booking.create({
        experience_id,
        slot_id,
        user_name,
        user_email,
        user_phone: user_phone || undefined,
        number_of_people,
        promo_code: promo_code || undefined,
        discount_amount,
        base_amount,
        final_amount,
        booking_reference,
        status: 'confirmed'
      });

      // Fetch complete booking details
      const completeBooking = await Booking.findByReference(booking_reference);

      res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        data: completeBooking
      });

    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create booking',
        error: error.message
      });
    }
  },

  // GET /api/bookings/:reference - Get booking by reference
  getBookingByReference: async (req, res) => {
    try {
      const { reference } = req.params;
      const booking = await Booking.findByReference(reference);

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      res.status(200).json({
        success: true,
        data: booking
      });
    } catch (error) {
      console.error('Error fetching booking:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch booking',
        error: error.message
      });
    }
  }
};

module.exports = bookingController;
