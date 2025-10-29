const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  base_price: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews_count: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Virtual for slots
experienceSchema.virtual('slots', {
  ref: 'Slot',
  localField: '_id',
  foreignField: 'experience_id'
});

// Method to get all experiences with slot counts
experienceSchema.statics.findAllWithSlots = async function() {
  const experiences = await this.find().lean();
  const Slot = mongoose.model('Slot');
  
  const experiencesWithSlots = await Promise.all(
    experiences.map(async (exp) => {
      const slots = await Slot.find({
        experience_id: exp._id,
        date: { $gte: new Date().toISOString().split('T')[0] }
      });
      
      const min_price = slots.length > 0 ? Math.min(...slots.map(s => s.price)) : exp.base_price;
      
      return {
        ...exp,
        id: exp._id,
        total_slots: slots.length,
        min_price
      };
    })
  );
  
  return experiencesWithSlots;
};

// Method to get experience by ID with slots
experienceSchema.statics.findByIdWithSlots = async function(id) {
  const experience = await this.findById(id).lean();
  if (!experience) return null;
  
  const Slot = mongoose.model('Slot');
  const slots = await Slot.find({
    experience_id: id,
    date: { $gte: new Date().toISOString().split('T')[0] }
  }).sort({ date: 1, time_slot: 1 });
  
  return {
    ...experience,
    id: experience._id,
    slots: slots.map(s => ({ ...s, id: s._id }))
  };
};

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
