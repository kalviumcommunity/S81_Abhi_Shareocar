import { Router } from 'express';
import { auth, authorize } from '../middleware/auth.js';
import { createParcel, myParcels, acceptParcel } from '../controllers/parcelController.js';

const r = Router();

r.post('/', auth, createParcel);
r.get('/me', auth, myParcels);
r.patch('/:id/accept', auth, authorize(['admin']), acceptParcel);

export default r;
