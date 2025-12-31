import { Router } from 'express';
import { createRide, getRide, listRides, updateRide } from '../controllers/rideController.js';
import { requireAuth, requireVerifiedDriver } from '../middleware/auth.js';
import { bookRide } from '../controllers/bookingController.js';
import { bookOnRide } from '../controllers/courierController.js';

const r = Router();

r.get('/', listRides);
r.get('/:id', getRide);
<<<<<<< Updated upstream
r.post('/', auth, postRide);
r.patch('/:id/status', auth, updateRideStatus);
=======
r.post('/', requireAuth, requireVerifiedDriver, createRide);
r.post('/:id/book', requireAuth, bookRide);
r.post('/:id/courier-book', requireAuth, bookOnRide);
r.put('/:id', requireAuth, requireVerifiedDriver, updateRide);
>>>>>>> Stashed changes

export default r;
