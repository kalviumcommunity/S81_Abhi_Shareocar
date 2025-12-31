import { Router } from 'express';
import { triggerSOS } from '../controllers/sosController.js';
import { requireAuth } from '../middleware/auth.js';

const r = Router();

r.post('/', requireAuth, triggerSOS);

export default r;
