import { Router } from 'express';
import { triggerSOS, getMyAlerts } from '../controllers/sosController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate, sosSchema } from '../utils/validation.js';

const r = Router();

r.post('/', requireAuth, validate(sosSchema), triggerSOS);
r.get('/my', requireAuth, getMyAlerts);

export default r;
