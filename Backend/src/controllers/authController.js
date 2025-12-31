import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
// OTP and SMS removed for smooth signup/login

const signToken = (user) => {
  const payload = { sub: user._id.toString(), role: user.role };
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', { expiresIn });
};

export const me = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json({ user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
  const token = signToken(user);
  const safeUser = user.toObject();
  delete safeUser.password;
  res.json({ token, user: safeUser });
};

export const signup = async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password)
    return res.status(400).json({ message: 'All fields are required' });
  const exists = await User.findOne({ $or: [{ email }, { phone }] });
  if (exists) return res.status(409).json({ message: 'Account already exists' });
  const hash = await bcrypt.hash(password, 10);
  const role = email === (process.env.ADMIN_EMAIL || '') ? 'admin' : 'user';
  const user = await User.create({
    name,
    email,
    phone,
    password: hash,
    role,
  });
  const token = signToken(user);
  const safeUser = user.toObject();
  delete safeUser.password;
  res.status(201).json({ token, user: safeUser });
};

export const uploadVerificationDocs = async (req, res) => {
  const { idDocUrl, licenseUrl } = req.body;
  if (!idDocUrl || !licenseUrl)
    return res.status(400).json({ message: 'Both ID and License are required' });
  req.user.verification = {
    status: 'pending',
    idDocUrl,
    licenseUrl,
  };
  await req.user.save();
  res.json({ message: 'Documents submitted. Verification pending.' });
};

export const verificationStatus = async (req, res) => {
  res.json({ status: req.user.verification?.status || 'none', verification: req.user.verification });
};
