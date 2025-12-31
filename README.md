# ShareOCar

Production-ready ride-sharing web app inspired by BlaBlaCar. Monorepo with frontend (Vite + React + Tailwind + Framer Motion + React Router) and backend (Node.js + Express + MongoDB Atlas).

## Features
- Smooth signup/login (no OTP)
- JWT auth, password hashing, protected routes, role-based access
- Auto admin role if email matches `ADMIN_EMAIL`
- Post/search rides; booking with history
- Courier: request delivery or book parcel weight on a ride
- Persistent SOS button stores alerts visible in admin dashboard
- Clean UI, responsive, loading + basic error handling

## Structure
- `frontend/` — Vite React app
- `backend/` — Express API server

## Environment
Create `.env` files.

Backend `.env`:
```
PORT=5000
CLIENT_URL=http://localhost:5173,http://localhost:5174
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=supersecret
ADMIN_EMAIL=admin@example.com
# Note: Email/SMS are not used in the current auth flow
```

Frontend `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

## Run locally
In two terminals:

Backend:
```powershell
Push-Location "c:\Users\abhiv\Desktop\S81_Abhi_Shareocar\backend"
npm run dev
```

Frontend:
```powershell
Push-Location "c:\Users\abhiv\Desktop\S81_Abhi_Shareocar\frontend"
npm run dev
```

Open http://localhost:5173 (or :5174 if Vite switches)

## API Overview
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/rides` `POST /api/rides` `GET /api/rides/:id` `PATCH /api/rides/:id/status`
- `POST /api/rides/:id/book` `GET /api/bookings/me`
- `POST /api/courier` `GET /api/courier/me`
- `POST /api/rides/:id/courier-book` `GET /api/courier/me/bookings`
- `POST /api/sos` `GET /api/sos` (admin) `PATCH /api/sos/:id/resolve` (admin)

## Notes
- Admin role is assigned automatically when logging in if email matches `ADMIN_EMAIL`.
- Courier capacity/pricing can be set by drivers when posting rides.
