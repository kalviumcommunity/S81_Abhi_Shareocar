import { Router } from 'express';
import {
  createRide,
  getRide,
  listRides,
  updateRide,
  deleteRide,
  myRides,
} from '../controllers/rideController.js';
import { requireAuth, requireVerifiedDriver, optionalAuth } from '../middleware/auth.js';
import { bookRide } from '../controllers/bookingController.js';
import { bookOnRide } from '../controllers/courierController.js';
import {
  validate,
  createRideSchema,
  updateRideSchema,
  bookRideSchema,
} from '../utils/validation.js';

const r = Router();

// Public routes
r.get('/', listRides);
r.get('/my', requireAuth, myRides);
r.get('/:id', optionalAuth, getRide);

// Protected routes
r.post('/', requireAuth, requireVerifiedDriver, validate(createRideSchema), createRide);
r.post('/:id/book', requireAuth, validate(bookRideSchema), bookRide);
r.post('/:id/courier-book', requireAuth, bookOnRide);
r.put('/:id', requireAuth, requireVerifiedDriver, validate(updateRideSchema), updateRide);
r.delete('/:id', requireAuth, deleteRide);

export default r;
