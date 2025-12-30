import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { postRide, listRides, getRide, updateRideStatus } from '../controllers/rideController.js';

const r = Router();

r.get('/', listRides);
r.get('/:id', getRide);
r.post('/', auth, postRide);
r.patch('/:id/status', auth, updateRideStatus);

export default r;
