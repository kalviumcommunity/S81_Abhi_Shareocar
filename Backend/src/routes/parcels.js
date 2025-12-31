import { Router } from 'express';
import { createParcelSlot, getParcelSlot, listParcelSlots, bookParcel, myParcelBookings } from '../controllers/parcelController.js';
import { requireAuth, requireVerifiedDriver } from '../middleware/auth.js';

const r = Router();

r.get('/', listParcelSlots);
r.get('/:id', getParcelSlot);
r.post('/', requireAuth, requireVerifiedDriver, createParcelSlot);
r.post('/:id/book', requireAuth, bookParcel);
r.get('/me/bookings', requireAuth, myParcelBookings);

export default r;
