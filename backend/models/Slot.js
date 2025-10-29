const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  experience_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time_slot: {
    type: String,
    required: true
  },
  available_spots: {
    type: Number,
    required: true
  },
  total_spots: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Compound index for unique slots
slotSchema.index({ experience_id: 1, date: 1, time_slot: 1 }, { unique: true });

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
