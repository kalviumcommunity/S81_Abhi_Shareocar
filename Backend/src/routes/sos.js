import { Router } from 'express';
import { auth, authorize } from '../middleware/auth.js';
import { createSOS, listSOS, resolveSOS } from '../controllers/sosController.js';

const r = Router();

r.post('/', auth, createSOS);
r.get('/', auth, authorize(['admin']), listSOS);
r.patch('/:id/resolve', auth, authorize(['admin']), resolveSOS);

export default r;
