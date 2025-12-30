import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { bookRide, myBookings } from '../controllers/bookingController.js';

const r = Router();

r.post('/:rideId', auth, bookRide);
r.get('/me', auth, myBookings);

export default r;
