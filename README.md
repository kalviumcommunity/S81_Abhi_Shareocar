# 🚗 ShareOCar – A Ride Sharing Platform

**ShareOCar** is a ride-sharing web app where users can offer or find rides, access a safety SOS button, and manage basic authentication. Inspired by platforms like BlaBlaCar, this is a simplified version built with React and Vite.

---

## ⚙️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **(Optional)** Backend: Node.js + Express
- **(Optional)** Database: MongoDB Atlas
- **(Planned)**: Razorpay Integration, JWT Authentication

---

## 🗓️ 3-Day Development Plan

###  Day 1 – Setup & UI Base

- Initialized project using Vite + React
- Installed Tailwind CSS and configured PostCSS
- Created initial pages:
  - `AuthForm` – Login UI
  - `Home` – Welcome screen
- Verified Tailwind classes apply properly

###  Day 2 – Core Features: Ride Posting

- Created components:
  - `RideForm` – Submit ride offers
  - `RideList` – Show posted rides
  - `SOSButton` – Safety alert
- Used `useState` for ride storage
- Implemented basic submission and display logic

###  Day 3 – Routing & UI Cleanup

- Installed and configured `react-router-dom`
- Setup routes:
  - `/auth` → `AuthForm`
  - `/home` → `Home`
  - `/post-ride` → `RideForm`, `RideList`, `SOSButton`
- Applied Tailwind CSS styling for a cleaner UI

---

## 🧭 Routes Summary

| Path        | Component      | Description                    |
|-------------|----------------|--------------------------------|
| `/auth`     | `AuthForm`     | Sign in page                   |
| `/home`     | `Home`         | Landing page                   |
| `/post-ride`| `RideForm` + `RideList` + `SOSButton` | Ride offer, list, SOS |


