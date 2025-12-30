import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import User from '../models/User.js';
import OTP from '../models/OTP.js';
import { generateOTP, expiryDate } from '../utils/otp.js';
import { sendEmailOTP } from '../utils/email.js';
import { sendSmsOTP } from '../utils/sms.js';

const signupSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
    password: z.string().min(6)
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
});

const otpVerifySchema = z.object({
  body: z.object({
    email: z.string().email(),
    phone: z.string().min(8),
    code: z.string().length(6)
  })
});

const signToken = (user) => {
  const payload = { sub: user._id.toString(), role: user.role };
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export const sendSignupOTP = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const exists = await User.findOne({ $or: [{ email }, { phone }] });
  if (exists) return res.status(409).json({ message: 'Account already exists' });
  const code = generateOTP();
  const expiresAt = expiryDate(10);
  await OTP.findOneAndUpdate(
    { email, phone, purpose: 'signup' },
    { code, expiresAt, attempts: 0 },
    { upsert: true }
  );
  await Promise.all([sendEmailOTP(email, code), sendSmsOTP(phone, code)]);
  res.json({ message: 'OTP sent to email and phone' });
};

export const verifySignupOTP = async (req, res) => {
  const { email, phone, code } = req.body;
  const record = await OTP.findOne({ email, phone, purpose: 'signup' });
  if (!record) return res.status(400).json({ message: 'No OTP found' });
  if (record.expiresAt < new Date()) return res.status(400).json({ message: 'OTP expired' });
  if (record.code !== code) {
    record.attempts += 1;
    await record.save();
    return res.status(400).json({ message: 'Invalid OTP' });
  }
  res.json({ message: 'OTP verified. Proceed to complete signup.' });
};

export const completeSignup = async (req, res) => {
  const parse = signupSchema.safeParse({ body: req.body });
  if (!parse.success) return res.status(400).json({ message: 'Invalid data', errors: parse.error.issues });
  const { name, email, phone, password } = parse.data.body;
  const record = await OTP.findOne({ email, phone, purpose: 'signup' });
  if (!record || record.code === null || record.expiresAt < new Date())
    return res.status(400).json({ message: 'OTP not verified' });

  const hash = await bcrypt.hash(password, 10);
  const role = email === (process.env.ADMIN_EMAIL || '') ? 'admin' : 'user';
  const user = await User.create({ name, email, phone, password: hash, role, verifiedEmail: true, verifiedPhone: true });
  await OTP.deleteMany({ email, phone, purpose: 'signup' });

  const token = signToken(user);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role } });
};

export const login = async (req, res) => {
  const parse = loginSchema.safeParse({ body: req.body });
  if (!parse.success) return res.status(400).json({ message: 'Invalid data' });
  const { email, password } = parse.data.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  if (user.email === (process.env.ADMIN_EMAIL || '') && user.role !== 'admin') {
    user.role = 'admin';
    await user.save();
  }
  const token = signToken(user);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role } });
};

export const getMe = async (req, res) => {
  const user = req.user;
  res.json({ user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role } });
};
