import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { sendSignupOTP, verifySignupOTP, completeSignup, login, getMe } from '../controllers/authController.js';

const r = Router();

r.post('/signup/send-otp', sendSignupOTP);
r.post('/signup/verify-otp', verifySignupOTP);
r.post('/signup/complete', completeSignup);
r.post('/login', login);
r.get('/me', auth, getMe);

export default r;
