import { Router } from 'express';
import authRoutes from './auth.js';
import rideRoutes from './rides.js';
import bookingRoutes from './bookings.js';
import parcelRoutes from './parcels.js';
import sosRoutes from './sos.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/rides', rideRoutes);
router.use('/bookings', bookingRoutes);
router.use('/parcels', parcelRoutes);
router.use('/sos', sosRoutes);

export default router;
