# BookIt Frontend

Modern React + TypeScript frontend for the BookIt experience booking application.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
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

3. Update `.env` if needed:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm run dev
```

Application will run on http://localhost:5173

## 🎨 Features

### Pages

1. **Home Page** (`/`)
   - Browse all experiences
   - Search by keyword
   - Filter by category
   - Responsive grid layout

2. **Details Page** (`/experience/:id`)
   - View experience details
   - Select date and time slot
   - Choose number of people
   - Real-time availability checking
   - Price calculation

3. **Checkout Page** (`/checkout`)
   - User information form
   - Promo code validation
   - Price summary
   - Form validation

4. **Result Page** (`/result/:reference`)
   - Booking confirmation
   - Booking reference number
   - Email confirmation notice
   - Download receipt option

### Components

- **Layout**: Header, footer, and navigation
- **ExperienceCard**: Display experience with image and details
- **LoadingSpinner**: Loading state indicator
- **ErrorMessage**: Error handling component

## 🛠️ Tech Stack

- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **TailwindCSS**: Utility-first styling
- **React Router v6**: Client-side routing
- **Axios**: HTTP client
- **Lucide React**: Icon library

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout.tsx
│   ├── ExperienceCard.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── DetailsPage.tsx
│   ├── CheckoutPage.tsx
│   └── ResultPage.tsx
├── services/
│   └── api.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🎯 Key Features

### State Management
- React hooks (useState, useEffect)
- Location state for passing data between routes
- No external state management needed

### API Integration
- Centralized API service layer
- Error handling with interceptors
- TypeScript types for all API responses

### Responsive Design
- Mobile-first approach
- TailwindCSS breakpoints
- Flexible grid layouts

### Form Validation
- Client-side validation
- Real-time error messages
- Required field checking
- Email format validation

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Styling

### TailwindCSS Configuration

Custom colors:
```js
primary: {
  50: '#f0f9ff',
  100: '#e0f2fe',
  // ... up to 900
}
```

### Custom CSS Classes

Defined in `index.css`:
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`
- `.card`
- `.input`, `.label`
- `.container`

## 🚀 Deployment

### Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
npm run build
vercel --prod
```

3. Set environment variable:
```bash
vercel env add VITE_API_URL
```

### Netlify

1. Build the app:
```bash
npm run build
```

2. Deploy `dist` folder to Netlify

3. Set environment variable `VITE_API_URL` in Netlify dashboard

## 🧪 Testing

### Manual Testing Checklist

- [ ] Home page loads with experiences
- [ ] Search functionality works
- [ ] Category filter works
- [ ] Can navigate to experience details
- [ ] Can select date and time slot
- [ ] Number of people selector works
- [ ] Booking summary shows correct price
- [ ] Checkout form validation works
- [ ] Promo code validation works
- [ ] Booking confirmation displays correctly
- [ ] All links and navigation work
- [ ] Responsive on mobile devices

## 📝 Environment Variables

```env
VITE_API_URL=http://localhost:5000/api  # Backend API URL
```

For production:
```env
VITE_API_URL=https://your-backend-url.com/api
```

## 🐛 Common Issues

### Blank Page After Build
- Check `VITE_API_URL` is set correctly
- Ensure backend is accessible
- Check browser console for errors

### API Errors
- Verify backend is running
- Check CORS configuration
- Inspect network requests in DevTools

### Styling Issues
- Clear browser cache
- Run `npm run build` again
- Check Tailwind configuration

## 📚 Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)

## 📝 License

MIT
