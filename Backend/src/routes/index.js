import { Router } from 'express';
import auth from './auth.js';
import rides from './rides.js';
import bookings from './bookings.js';
import courier from './courier.js';
import sos from './sos.js';
import admin from './admin.js';

const router = Router();

router.use('/auth', auth);
router.use('/rides', rides);
router.use('/bookings', bookings);
router.use('/courier', courier);
router.use('/sos', sos);
router.use('/admin', admin);

export default router;
