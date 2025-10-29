-- Create Database Tables

-- Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    image_url TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    duration VARCHAR(100),
    rating DECIMAL(3, 2) DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Slots Table
CREATE TABLE IF NOT EXISTS slots (
    id SERIAL PRIMARY KEY,
    experience_id INTEGER NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    available_spots INTEGER NOT NULL,
    total_spots INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(experience_id, date, time_slot)
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    experience_id INTEGER NOT NULL REFERENCES experiences(id),
    slot_id INTEGER NOT NULL REFERENCES slots(id),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_phone VARCHAR(20),
    number_of_people INTEGER NOT NULL DEFAULT 1,
    promo_code VARCHAR(50),
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    base_amount DECIMAL(10, 2) NOT NULL,
    final_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'confirmed',
    booking_reference VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Promo Codes Table
CREATE TABLE IF NOT EXISTS promo_codes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(20) NOT NULL, -- 'percentage' or 'fixed'
    discount_value DECIMAL(10, 2) NOT NULL,
    max_discount DECIMAL(10, 2),
    min_purchase DECIMAL(10, 2),
    valid_from DATE,
    valid_until DATE,
    is_active BOOLEAN DEFAULT true,
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes
CREATE INDEX IF NOT EXISTS idx_slots_experience ON slots(experience_id);
CREATE INDEX IF NOT EXISTS idx_slots_date ON slots(date);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(user_email);
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON bookings(booking_reference);
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON promo_codes(code);
