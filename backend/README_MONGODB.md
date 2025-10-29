# BookIt Backend - MongoDB Version

Backend API server for the BookIt application built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (Local or MongoDB Compass)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
Copy-Item .env.example .env
```

3. Update `.env` with your MongoDB connection string:
```env
MONGODB_URI=mongodb://localhost:27017/bookit_db
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Note**: If you're using MongoDB Atlas (cloud), use:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bookit_db
```

4. **Ensure MongoDB is running**:
   - If using MongoDB Compass, start MongoDB service
   - Windows: MongoDB should auto-start with service
   - Check if it's running: open MongoDB Compass and try to connect

5. Run seed script to populate database:
```bash
npm run seed
```

6. Start the server:
```bash
npm run dev
```

Server will run on http://localhost:5000

## 📚 MongoDB Collections

The application uses 4 main collections:

1. **experiences**: Travel experiences/activities
   - Contains title, description, location, category, pricing, ratings

2. **slots**: Available time slots for experiences
   - Linked to experiences via `experience_id`
   - Contains date, time_slot, available_spots, price

3. **bookings**: Customer bookings
   - References both experience and slot
   - Contains user details, payment info, booking reference

4. **promocodes**: Promotional discount codes
   - Contains discount rules, validity, usage limits

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Experiences
- **GET** `/experiences` - Get all experiences with slot counts
- **GET** `/experiences/:id` - Get experience details with available slots

### Bookings
- **POST** `/bookings` - Create a new booking
- **GET** `/bookings/:reference` - Get booking by reference number

### Promo Codes
- **POST** `/promo/validate` - Validate a promo code

## 🗄️ MongoDB Schema Details

### Experience Schema
```javascript
{
  title: String (required),
  description: String (required),
  location: String (required),
  category: String (required),
  image_url: String (required),
  base_price: Number (required),
  duration: String (required),
  rating: Number (0-5),
  reviews_count: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Slot Schema
```javascript
{
  experience_id: ObjectId (ref: Experience),
  date: String (YYYY-MM-DD),
  time_slot: String,
  available_spots: Number,
  total_spots: Number,
  price: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Schema
```javascript
{
  experience_id: ObjectId (ref: Experience),
  slot_id: ObjectId (ref: Slot),
  user_name: String,
  user_email: String,
  user_phone: String,
  number_of_people: Number,
  promo_code: String,
  discount_amount: Number,
  base_amount: Number,
  final_amount: Number,
  status: String (confirmed/cancelled/completed),
  booking_reference: String (unique),
  createdAt: Date,
  updatedAt: Date
}
```

### PromoCode Schema
```javascript
{
  code: String (unique, uppercase),
  discount_type: String (percentage/fixed),
  discount_value: Number,
  max_discount: Number,
  min_purchase: Number,
  valid_from: Date,
  valid_until: Date,
  is_active: Boolean,
  usage_limit: Number,
  usage_count: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠️ Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

### MongoDB with Compass

1. **Open MongoDB Compass**
2. **Connect to**: `mongodb://localhost:27017`
3. **Database will be created automatically** when you run the seed script
4. **View your data**:
   - Database: `bookit_db`
   - Collections: experiences, slots, bookings, promocodes

### Viewing Data

After running seed script, you can view data in MongoDB Compass:
- **Experiences**: 8 travel experiences
- **Slots**: Multiple slots for next 14 days for each experience
- **PromoCode**: 4 promo codes (SAVE10, FLAT100, WELCOME20, FIRST500)

## 🔧 Troubleshooting

### MongoDB Connection Error

**Error**: `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions**:
1. Check if MongoDB is running:
   - Open MongoDB Compass
   - Try to connect to `localhost:27017`
   
2. Start MongoDB service:
   ```powershell
   # Windows (Run as Administrator)
   net start MongoDB
   ```

3. Check MongoDB installation:
   - Open Services (Win + R → `services.msc`)
   - Find "MongoDB Server"
   - Status should be "Running"

### Port Already in Use

**Error**: `Port 5000 is already in use`

**Solution**: Change PORT in `.env`:
```env
PORT=5001
```

### Seed Script Fails

**Error**: Database connection timeout

**Solutions**:
1. Ensure MongoDB is running
2. Check MONGODB_URI in `.env`
3. Try connecting with MongoDB Compass first
4. Check firewall isn't blocking port 27017

## 🚀 Deployment

### MongoDB Atlas (Cloud Database)

1. Create free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update environment variable:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bookit_db
```

### Render/Railway Deployment

1. Create new Web Service
2. Set environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: 5000 (or auto-assigned)
   - `NODE_ENV`: production
   - `FRONTEND_URL`: Your frontend URL

3. Deploy and run seed:
```bash
npm run seed
```

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Enable CORS
- **dotenv**: Environment variables
- **express-validator**: Input validation

## 📝 License

MIT
