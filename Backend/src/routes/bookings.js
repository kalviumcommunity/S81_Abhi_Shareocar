import { Router } from 'express';
import { myBookings } from '../controllers/bookingController.js';
import { requireAuth } from '../middleware/auth.js';

const r = Router();

r.get('/me', requireAuth, myBookings);

export default r;
