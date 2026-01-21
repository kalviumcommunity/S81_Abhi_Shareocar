import { Router } from 'express';
import {
  myBookings,
  getBooking,
  cancelBooking,
  getRideBookings,
} from '../controllers/bookingController.js';
import { requireAuth } from '../middleware/auth.js';

const r = Router();

// User's bookings
r.get('/me', requireAuth, myBookings);
r.get('/ride/:rideId', requireAuth, getRideBookings);
r.get('/:id', requireAuth, getBooking);
r.put('/:id/cancel', requireAuth, cancelBooking);

export default r;
