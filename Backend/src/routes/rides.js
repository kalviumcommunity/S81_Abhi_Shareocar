import { Router } from 'express';
import { createRide, getRide, listRides } from '../controllers/rideController.js';
import { requireAuth, requireVerifiedDriver } from '../middleware/auth.js';
import { bookRide } from '../controllers/bookingController.js';
import { bookOnRide } from '../controllers/courierController.js';

const r = Router();

r.get('/', listRides);
r.get('/:id', getRide);
r.post('/', auth, postRide);
r.patch('/:id/status', auth, updateRideStatus);

export default r;
