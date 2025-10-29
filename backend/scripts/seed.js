const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Experience = require('../models/Experience');
const Slot = require('../models/Slot');
const PromoCode = require('../models/PromoCode');

// Sample experiences with royalty-free images from Unsplash
const experiences = [
  {
    title: 'Hot Air Balloon Safari',
    description: 'Experience the breathtaking beauty of sunrise from a hot air balloon. Float peacefully over stunning landscapes and wildlife. This unforgettable adventure includes a champagne breakfast and certificate of flight.',
    location: 'Jaipur, Rajasthan',
    category: 'Adventure',
    image_url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80',
    base_price: 8999,
    duration: '3-4 hours',
    rating: 4.8,
    reviews_count: 156
  },
  {
    title: 'Scuba Diving in Andaman',
    description: 'Dive into the crystal-clear waters of Andaman and explore vibrant coral reefs and exotic marine life. Perfect for beginners and experienced divers. Professional instructors and all equipment included.',
    location: 'Havelock Island, Andaman',
    category: 'Water Sports',
    image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    base_price: 4500,
    duration: '2-3 hours',
    rating: 4.9,
    reviews_count: 243
  },
  {
    title: 'Paragliding in Bir Billing',
    description: 'Soar like a bird over the magnificent Himalayas. Bir Billing is one of the top paragliding destinations in the world. Experience the thrill of flying with experienced pilots ensuring your safety.',
    location: 'Bir Billing, Himachal Pradesh',
    category: 'Adventure',
    image_url: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800&q=80',
    base_price: 2500,
    duration: '30-45 minutes',
    rating: 4.7,
    reviews_count: 189
  },
  {
    title: 'Backwater Houseboat Cruise',
    description: 'Enjoy a serene cruise through the tranquil backwaters of Kerala. Stay overnight in a traditional houseboat with authentic Kerala cuisine, scenic views, and peaceful surroundings.',
    location: 'Alleppey, Kerala',
    category: 'Leisure',
    image_url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80',
    base_price: 12000,
    duration: '22 hours (1 night)',
    rating: 4.6,
    reviews_count: 312
  },
  {
    title: 'Wildlife Safari at Ranthambore',
    description: 'Embark on an exciting jungle safari to spot the majestic Royal Bengal Tigers. Explore the diverse flora and fauna of Ranthambore National Park with expert naturalists.',
    location: 'Ranthambore, Rajasthan',
    category: 'Wildlife',
    image_url: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80',
    base_price: 3500,
    duration: '3-4 hours',
    rating: 4.5,
    reviews_count: 278
  },
  {
    title: 'Trekking to Valley of Flowers',
    description: 'Trek through meadows filled with endemic alpine flowers and rare wildlife. A UNESCO World Heritage Site offering stunning views of snow-capped peaks and pristine nature.',
    location: 'Uttarakhand',
    category: 'Trekking',
    image_url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    base_price: 15000,
    duration: '6 days / 5 nights',
    rating: 4.9,
    reviews_count: 421
  },
  {
    title: 'Desert Camping with Camel Safari',
    description: 'Experience the magic of the Thar Desert with camel rides, traditional Rajasthani folk performances, and stargazing. Enjoy authentic local cuisine and spend the night in luxury tents.',
    location: 'Jaisalmer, Rajasthan',
    category: 'Camping',
    image_url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&q=80',
    base_price: 3164,
    duration: '24 hours',
    rating: 4.7,
    reviews_count: 198
  },
  {
    title: 'White Water Rafting in Rishikesh',
    description: 'Navigate through thrilling rapids of the Ganges River. Experience the perfect blend of adventure and spirituality in the yoga capital of the world. Safety equipment and training provided.',
    location: 'Rishikesh, Uttarakhand',
    category: 'Adventure',
    image_url: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=800&q=80',
    base_price: 1361,
    duration: '3-4 hours',
    rating: 4.8,
    reviews_count: 356
  }
];

// Function to generate future dates
function getFutureDates(startDays, count) {
  const dates = [];
  for (let i = startDays; i < startDays + count; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
}

// Time slots
const timeSlots = [
  { slot: '06:00 AM - 09:00 AM', spots: 8 },
  { slot: '10:00 AM - 01:00 PM', spots: 12 },
  { slot: '02:00 PM - 05:00 PM', spots: 10 },
  { slot: '06:00 PM - 09:00 PM', spots: 6 }
];

// Promo codes
const promoCodes = [
  {
    code: 'SAVE10',
    discount_type: 'percentage',
    discount_value: 10,
    max_discount: 1000,
    min_purchase: 2000,
    valid_until: new Date('2025-12-31')
  },
  {
    code: 'FLAT100',
    discount_type: 'fixed',
    discount_value: 100,
    min_purchase: 1000,
    valid_until: new Date('2025-12-31')
  },
  {
    code: 'WELCOME20',
    discount_type: 'percentage',
    discount_value: 20,
    max_discount: 2000,
    min_purchase: 5000,
    valid_until: new Date('2025-12-31')
  },
  {
    code: 'FIRST500',
    discount_type: 'fixed',
    discount_value: 500,
    min_purchase: 3000,
    valid_until: new Date('2025-12-31'),
    usage_limit: 100
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');

    // Connect to MongoDB
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Experience.deleteMany({});
    await Slot.deleteMany({});
    await PromoCode.deleteMany({});
    console.log('✅ Existing data cleared');

    // Insert experiences
    console.log('📝 Inserting experiences...');
    const createdExperiences = [];
    
    for (const exp of experiences) {
      const experience = await Experience.create(exp);
      createdExperiences.push(experience);
      console.log(`  ✓ Created: ${exp.title}`);

      // Insert slots for each experience
      const dates = getFutureDates(1, 14); // Next 14 days
      
      for (const date of dates) {
        // Add 2-3 random time slots per day
        const numSlots = Math.floor(Math.random() * 2) + 2;
        const shuffledSlots = [...timeSlots].sort(() => Math.random() - 0.5).slice(0, numSlots);
        
        for (const timeSlot of shuffledSlots) {
          const priceVariation = (Math.random() * 0.2 - 0.1); // ±10% price variation
          const slotPrice = Math.round(exp.base_price * (1 + priceVariation));
          
          await Slot.create({
            experience_id: experience._id,
            date: date,
            time_slot: timeSlot.slot,
            available_spots: timeSlot.spots,
            total_spots: timeSlot.spots,
            price: slotPrice
          });
        }
      }
    }
    console.log(`✅ Inserted ${experiences.length} experiences with slots`);

    // Insert promo codes
    console.log('🎟️  Inserting promo codes...');
    for (const promo of promoCodes) {
      await PromoCode.create(promo);
      console.log(`  ✓ Created promo: ${promo.code}`);
    }
    console.log(`✅ Inserted ${promoCodes.length} promo codes`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - ${experiences.length} experiences`);
    console.log(`   - Slots for next 14 days`);
    console.log(`   - ${promoCodes.length} promo codes`);
    console.log('\n💡 Promo Codes to try:');
    promoCodes.forEach(p => console.log(`   - ${p.code}: ${p.discount_type === 'percentage' ? p.discount_value + '%' : '₹' + p.discount_value} off`));

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
  }
}

// Run seed
seedDatabase()
  .then(() => {
    console.log('\n✅ Seed completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  });
