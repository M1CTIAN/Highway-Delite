const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { body } = require('express-validator');

// POST /api/bookings - Create a new booking
router.post(
  '/',
  [
    body('experience_id').isInt().withMessage('Valid experience ID is required'),
    body('slot_id').isInt().withMessage('Valid slot ID is required'),
    body('user_name').trim().notEmpty().withMessage('Name is required'),
    body('user_email').isEmail().withMessage('Valid email is required'),
    body('user_phone').optional().isMobilePhone('any').withMessage('Valid phone number required'),
    body('number_of_people').isInt({ min: 1 }).withMessage('Number of people must be at least 1')
  ],
  bookingController.createBooking
);

// GET /api/bookings/:reference - Get booking by reference
router.get('/:reference', bookingController.getBookingByReference);

module.exports = router;
