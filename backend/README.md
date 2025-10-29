# BookIt Backend

Backend API server for the BookIt application built with Node.js, Express, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- PostgreSQL v14+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your database credentials

4. Create PostgreSQL database:
```bash
psql -U postgres
CREATE DATABASE bookit_db;
\q
```

5. Run seed script:
```bash
npm run seed
```

6. Start the server:
```bash
npm run dev
```

Server will run on http://localhost:5000

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### GET /experiences
Get all experiences with slots count

**Response**:
```json
{
  "success": true,
  "count": 8,
  "data": [...]
}
```

#### GET /experiences/:id
Get experience details with available slots

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Hot Air Balloon Safari",
    "slots": [...]
  }
}
```

#### POST /bookings
Create a new booking

**Request Body**:
```json
{
  "experience_id": 1,
  "slot_id": 5,
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "user_phone": "+91 9876543210",
  "number_of_people": 2,
  "promo_code": "SAVE10"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "booking_reference": "BK...",
    ...
  }
}
```

#### POST /promo/validate
Validate a promo code

**Request Body**:
```json
{
  "code": "SAVE10",
  "amount": 5000
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "code": "SAVE10",
    "discount_amount": 500,
    "final_amount": 4500
  }
}
```

## 🗄️ Database Schema

### Tables

- **experiences**: Travel experiences/activities
- **slots**: Available time slots for each experience
- **bookings**: Customer bookings
- **promo_codes**: Promotional discount codes

### Relationships

- One experience has many slots
- One slot can have many bookings
- Bookings reference both experience and slot

## 🔒 Security Features

- Input validation using express-validator
- SQL injection prevention using parameterized queries
- CORS enabled for frontend access
- Transaction support for booking operations

## 🛠️ Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

### Testing

Test API endpoints using:
- Postman
- Thunder Client
- cURL

### Example cURL Requests

```bash
# Get all experiences
curl http://localhost:5000/api/experiences

# Create booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "experience_id": 1,
    "slot_id": 5,
    "user_name": "John Doe",
    "user_email": "john@example.com",
    "number_of_people": 2
  }'
```

## 📦 Dependencies

- **express**: Web framework
- **pg**: PostgreSQL client
- **cors**: Enable CORS
- **dotenv**: Environment variables
- **express-validator**: Input validation

## 🚀 Deployment

### Render/Railway

1. Create PostgreSQL database
2. Set environment variables
3. Deploy backend code
4. Run seed script

### Environment Variables

```env
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.com
```

## 📝 License

MIT
