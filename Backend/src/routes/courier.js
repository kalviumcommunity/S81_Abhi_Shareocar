import { Router } from 'express';
import { createRequest, myRequests, getRequest, myBookings } from '../controllers/courierController.js';
import { requireAuth } from '../middleware/auth.js';

const r = Router();

r.post('/', requireAuth, createRequest);
r.get('/me', requireAuth, myRequests);
r.get('/:id', requireAuth, getRequest);
r.get('/me/bookings', requireAuth, myBookings);

export default r;
