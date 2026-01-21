import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  signup,
  login,
  me,
  uploadVerificationDocs,
  verificationStatus,
  changePassword,
  updateProfile,
} from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import {
  validate,
  signupSchema,
  loginSchema,
  verificationDocsSchema,
} from '../utils/validation.js';

const r = Router();

// Stricter rate limiting for auth routes to prevent brute force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per window
  message: { message: 'Too many authentication attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public auth routes with stricter rate limiting
r.post('/signup', authLimiter, validate(signupSchema), signup);
r.post('/login', authLimiter, validate(loginSchema), login);

// Protected routes
r.get('/me', requireAuth, me);
r.put('/password', requireAuth, changePassword);
r.put('/profile', requireAuth, updateProfile);

// Verification routes
r.post('/verify/upload-docs', requireAuth, validate(verificationDocsSchema), uploadVerificationDocs);
r.get('/verify/status', requireAuth, verificationStatus);

export default r;
