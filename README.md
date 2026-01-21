# ShareOCar 🚗

A production-ready ride-sharing web application inspired by BlaBlaCar. Monorepo with a React frontend and Node.js/Express backend.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## ✨ Features

### Core Features
- 🔐 **Secure Authentication** — JWT-based auth with bcrypt password hashing
- 🚙 **Ride Sharing** — Post, search, book, and manage rides
- 📦 **Courier Service** — Request delivery or book parcel weight on rides
- 🆘 **SOS Emergency** — Persistent SOS button with location tracking
- 👤 **Driver Verification** — Document upload and admin verification workflow
- 🛡️ **Role-Based Access** — User and Admin roles with protected routes

### Security Features
- ✅ Input validation with Zod schemas
- ✅ Password strength requirements (8+ chars, uppercase, lowercase, number)
- ✅ Rate limiting (stricter for auth routes)
- ✅ Timing attack prevention on login
- ✅ Helmet security headers
- ✅ CORS configuration

### Admin Dashboard
- 📊 Platform statistics and analytics
- 👥 User management (view, verify drivers, update roles)
- 🔍 Pending verification queue
- 📋 Recent activity monitoring

## 📁 Project Structure

```
ShareOCar/
├── Backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth, validation middleware
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API route definitions
│   │   ├── utils/          # Helpers (validation, async handler)
│   │   └── index.js        # App entry point
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context (Auth)
│   │   ├── lib/            # API client
│   │   └── pages/          # Page components
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## ⚙️ Environment Setup

### Backend `.env`
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173,http://localhost:5174
MONGODB_URI=mongodb://localhost:27017/shareocar
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
ADMIN_EMAIL=admin@example.com
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/S81_Abhi_Shareocar.git
cd S81_Abhi_Shareocar

# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running Locally

**Terminal 1 - Backend:**
```bash
cd Backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Open http://localhost:5173 in your browser.

### Using Docker

```bash
docker-compose up --build
```

## 📚 API Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login and get token |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/password` | Change password |
| PUT | `/api/auth/profile` | Update profile |
| POST | `/api/auth/verify/upload-docs` | Upload verification documents |
| GET | `/api/auth/verify/status` | Get verification status |

### Rides
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rides` | List rides (with filters) |
| GET | `/api/rides/my` | Get user's posted rides |
| GET | `/api/rides/:id` | Get ride details |
| POST | `/api/rides` | Create new ride (verified drivers) |
| PUT | `/api/rides/:id` | Update ride |
| DELETE | `/api/rides/:id` | Delete/cancel ride |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/rides/:id/book` | Book seats on a ride |
| GET | `/api/bookings/me` | Get user's bookings |
| GET | `/api/bookings/:id` | Get booking details |
| PUT | `/api/bookings/:id/cancel` | Cancel a booking |
| GET | `/api/bookings/ride/:rideId` | Get ride's bookings (owner) |

### Courier
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/courier` | Request parcel delivery |
| GET | `/api/courier/me` | Get user's courier requests |
| POST | `/api/rides/:id/courier-book` | Book parcel space on ride |
| GET | `/api/courier/me/bookings` | Get parcel bookings |

### SOS
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/sos` | Trigger SOS alert |
| GET | `/api/sos/my` | Get user's SOS history |

### Admin (Requires Admin Role)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Platform statistics |
| GET | `/api/admin/users` | List all users |
| GET | `/api/admin/users/:id` | Get user details |
| PUT | `/api/admin/users/:id/verify` | Verify/reject driver |
| PUT | `/api/admin/users/:id/role` | Update user role |
| DELETE | `/api/admin/users/:id` | Delete user |

## 🔒 Validation Rules

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

### Rate Limits
- **Global:** 120 requests per minute
- **Auth routes:** 10 attempts per 15 minutes

## 🧪 Testing

```bash
cd Backend
npm test
```

## 🐳 Docker Support

The project includes Docker configuration for easy deployment:

```bash
# Build and run all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📝 Notes

- **Admin Role:** Automatically assigned when email matches `ADMIN_EMAIL` environment variable
- **Driver Verification:** Drivers must upload ID and license documents, then wait for admin approval before posting rides
- **In-Memory MongoDB:** Set `MONGO_MEMORY=1` for testing without a MongoDB instance
- **Courier Pricing:** Drivers can set parcel capacity (kg) and price per kg when posting rides

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by Abhi
