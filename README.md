# BookIt: Experiences & Slots

A full-stack web application for discovering and booking travel experiences across India. Built with React + TypeScript + Vite on the frontend and Node.js + Express + PostgreSQL on the backend.

![BookIt](https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=400&fit=crop)

## 🚀 Features

- **Browse Experiences**: Explore a variety of travel experiences with beautiful images and detailed information
- **Smart Filtering**: Filter by category and search by location, title, or description
- **Dynamic Slot Selection**: View available dates and time slots with real-time availability
- **Booking Flow**: Complete end-to-end booking with user details and payment summary
- **Promo Codes**: Apply promotional codes for discounts (SAVE10, FLAT100, WELCOME20, FIRST500)
- **Booking Confirmation**: Get instant confirmation with booking reference and email notification
- **Responsive Design**: Mobile-friendly interface built with TailwindCSS
- **Type Safety**: Full TypeScript implementation for better developer experience

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Demo Credentials](#demo-credentials)

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Express Validator
- **CORS**: Enabled for cross-origin requests

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) or MongoDB Compass - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager
- **Git** (for cloning the repository)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Highway Delite"
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Configuration

1. **Ensure MongoDB is running**:

If using **MongoDB Compass**:
- Open MongoDB Compass
- Connect to `mongodb://localhost:27017`
- MongoDB should be running automatically

If MongoDB is not running:
```powershell
# Windows (Run as Administrator)
net start MongoDB
```

2. **Create `.env` file in the `backend` folder**:

```bash
cd backend
cp .env.example .env
```

3. **Update `.env` with your MongoDB connection**:

```env
MONGODB_URI=mongodb://localhost:27017/bookit_db
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Note**: For MongoDB Atlas (cloud), use:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bookit_db
```

4. **Run database seed script**:

```bash
npm run seed
```

This will:
- Create the `bookit_db` database automatically
- Insert 8 sample travel experiences with royalty-free images
- Generate slots for the next 14 days
- Add 4 promo codes (SAVE10, FLAT100, WELCOME20, FIRST500)

### Frontend Configuration

1. **Create `.env` file in the `frontend` folder**:

```bash
cd frontend
cp .env.example .env
```

2. **Update `.env` if needed** (default should work):

```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on: http://localhost:5000

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on: http://localhost:5173

### Access the Application

Open your browser and navigate to: **http://localhost:5173**

## 📁 Project Structure

```
Highway Delite/
├── backend/
│   ├── config/
│   │   ├── database.js          # PostgreSQL connection
│   │   └── schema.sql            # Database schema
│   ├── controllers/
│   │   ├── experienceController.js
│   │   ├── bookingController.js
│   │   └── promoController.js
│   ├── models/
│   │   ├── Experience.js
│   │   ├── Slot.js
│   │   ├── Booking.js
│   │   └── PromoCode.js
│   ├── routes/
│   │   ├── experiences.js
│   │   ├── bookings.js
│   │   └── promo.js
│   ├── scripts/
│   │   └── seed.js              # Database seeding
│   ├── server.js                 # Express server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.tsx
│   │   │   ├── ExperienceCard.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorMessage.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── DetailsPage.tsx
│   │   │   ├── CheckoutPage.tsx
│   │   │   └── ResultPage.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Experiences

- **GET** `/api/experiences` - Get all experiences
- **GET** `/api/experiences/:id` - Get experience by ID with available slots

### Bookings

- **POST** `/api/bookings` - Create a new booking
- **GET** `/api/bookings/:reference` - Get booking by reference number

### Promo Codes

- **POST** `/api/promo/validate` - Validate a promo code

### API Request/Response Examples

#### Create Booking Request

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

#### Validate Promo Code Request

```json
{
  "code": "SAVE10",
  "amount": 5000
}
```

## 🎯 Demo Credentials

### Available Promo Codes

| Code | Type | Discount | Min Purchase | Details |
|------|------|----------|--------------|---------|
| **SAVE10** | Percentage | 10% off | ₹2,000 | Max discount: ₹1,000 |
| **FLAT100** | Fixed | ₹100 off | ₹1,000 | - |
| **WELCOME20** | Percentage | 20% off | ₹5,000 | Max discount: ₹2,000 |
| **FIRST500** | Fixed | ₹500 off | ₹3,000 | Limited to 100 uses |

### Sample Experiences

The seed script creates 8 diverse experiences:
1. Hot Air Balloon Safari - Jaipur
2. Scuba Diving - Andaman
3. Paragliding - Bir Billing
4. Backwater Houseboat Cruise - Kerala
5. Wildlife Safari - Ranthambore
6. Valley of Flowers Trek - Uttarakhand
7. Desert Camping - Jaisalmer
8. White Water Rafting - Rishikesh

## 🌐 Deployment

### Backend Deployment (Render/Railway)

1. Create a new PostgreSQL database on your hosting provider
2. Update environment variables with production database credentials
3. Deploy the backend folder
4. Run the seed script to populate data

### Frontend Deployment (Vercel/Netlify)

1. Update `VITE_API_URL` in frontend `.env` to point to your deployed backend
2. Build the frontend: `npm run build`
3. Deploy the `dist` folder to your hosting provider

### Environment Variables for Production

**Backend**:
```env
DB_HOST=<your-db-host>
DB_PORT=5432
DB_NAME=<your-db-name>
DB_USER=<your-db-user>
DB_PASSWORD=<your-db-password>
PORT=5000
NODE_ENV=production
FRONTEND_URL=<your-frontend-url>
```

**Frontend**:
```env
VITE_API_URL=<your-backend-api-url>
```

## 🧪 Testing the Application

### Manual Testing Flow

1. **Home Page**: Browse experiences, search, and filter by category
2. **Details Page**: Select an experience, choose date/time slot, and number of people
3. **Checkout Page**: Fill in user details, apply promo code, review summary
4. **Result Page**: View booking confirmation with reference number

### Test Scenarios

- Book an experience without a promo code
- Apply valid promo codes (SAVE10, FLAT100, etc.)
- Try invalid promo codes
- Select sold-out slots
- Book for multiple people
- Test form validation on checkout

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Error**:
```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Verify database exists
psql -U postgres -l
```

**Port Already in Use**:
```bash
# Change PORT in backend/.env to a different port
PORT=5001
```

### Frontend Issues

**API Connection Error**:
- Ensure backend is running
- Check `VITE_API_URL` in frontend `.env`
- Verify CORS is enabled in backend

**Build Errors**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 License

This project is created for educational purposes as part of a fullstack internship assignment.

## 👥 Contributing

This is an assignment project. Please reach out for any questions or clarifications.

## 📧 Contact

For any queries or support:
- Email: your.email@example.com
- GitHub: your-github-username

---

**Made with ❤️ for Internshala Fullstack Intern Assignment**
