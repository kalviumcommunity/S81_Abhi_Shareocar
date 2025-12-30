# ShareOCar

Production-ready ride-sharing web app inspired by BlaBlaCar. Monorepo with frontend (Vite + React + Tailwind + Framer Motion + React Router) and backend (Node.js + Express + MongoDB Atlas).

## Features
- Email + Phone signup with OTP verification
- JWT auth, password hashing, protected routes, role-based access
- Auto admin role if email matches `ADMIN_EMAIL`
- Post/search rides; booking with history
- Parcel transport with acceptance by admin (extensible to drivers)
- Persistent SOS button stores alerts visible in admin dashboard
- Clean UI, responsive, loading + basic error handling

## Structure
- `frontend/` — Vite React app
- `backend/` — Express API server

## Environment
Create `.env` files.

Backend `.env` (see `backend/.env.example`):
```
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=supersecret
ADMIN_EMAIL=admin@example.com
# SMTP (optional)
EMAIL_FROM=ShareOCar <no-reply@shareocar.com>
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
# Twilio (optional)
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_FROM_NUMBER=+1234567890
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

Open http://localhost:5173

## API Overview
- `POST /api/auth/signup/send-otp`
- `POST /api/auth/signup/verify-otp`
- `POST /api/auth/signup/complete`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/rides` `POST /api/rides` `GET /api/rides/:id` `PATCH /api/rides/:id/status`
- `POST /api/bookings/:rideId` `GET /api/bookings/me`
- `POST /api/parcels` `GET /api/parcels/me` `PATCH /api/parcels/:id/accept` (admin)
- `POST /api/sos` `GET /api/sos` (admin) `PATCH /api/sos/:id/resolve` (admin)

## Notes
- OTP delivery falls back to console logs in dev when SMTP/Twilio aren't configured.
- Admin role is assigned automatically when logging in if email matches `ADMIN_EMAIL`.
- Extend parcel acceptance to driver/ride owners by adding suitable role checks.
