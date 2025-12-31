import { Router } from 'express';
import { signup, login, me, uploadVerificationDocs, verificationStatus } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const r = Router();

r.post('/signup', signup);
r.post('/login', login);
r.get('/me', requireAuth, me);

// Verification
r.post('/verify/upload-docs', requireAuth, uploadVerificationDocs);
r.get('/verify/status', requireAuth, verificationStatus);

export default r;
