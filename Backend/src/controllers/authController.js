import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { asyncHandler, AppError } from '../utils/asyncHandler.js';

// Salt rounds for bcrypt - configurable via env
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12;

/**
 * Sign a JWT token for authenticated user
 * @param {Object} user - User document
 * @returns {string} JWT token
 */
const signToken = (user) => {
  const payload = {
    sub: user._id.toString(),
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
  };
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  const secret = process.env.JWT_SECRET;

  if (!secret || secret === 'dev-secret') {
    console.warn('[AUTH] WARNING: Using default JWT secret. Set JWT_SECRET in production!');
  }

  return jwt.sign(payload, secret || 'dev-secret', { expiresIn });
};

/**
 * Remove sensitive fields from user object
 * @param {Object} user - User document
 * @returns {Object} Safe user object
 */
const sanitizeUser = (user) => {
  const safeUser = user.toObject();
  delete safeUser.password;
  delete safeUser.__v;
  return safeUser;
};

/**
 * GET /api/auth/me - Get current authenticated user
 */
export const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password -__v');
  if (!user) {
    throw new AppError('User not found', 404);
  }
  res.json({ user });
});

/**
 * POST /api/auth/login - Authenticate user and return token
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email (case-insensitive due to lowercase index)
  const user = await User.findOne({ email: email.toLowerCase() });

  // Use constant-time comparison to prevent timing attacks
  if (!user) {
    // Still hash to prevent timing attacks
    await bcrypt.hash(password, SALT_ROUNDS);
    throw new AppError('Invalid email or password', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = signToken(user);
  res.json({
    message: 'Login successful',
    token,
    user: sanitizeUser(user),
  });
});

/**
 * POST /api/auth/signup - Register a new user
 */
export const signup = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  // Check for existing user with same email or phone
  const existingUser = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { phone }],
  });

  if (existingUser) {
    const field = existingUser.email === email.toLowerCase() ? 'email' : 'phone';
    throw new AppError(`An account with this ${field} already exists`, 409);
  }

  // Hash password with configured salt rounds
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Assign admin role if email matches ADMIN_EMAIL
  const role = email.toLowerCase() === (process.env.ADMIN_EMAIL || '').toLowerCase() ? 'admin' : 'user';

  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase(),
    phone,
    password: hashedPassword,
    role,
  });

  const token = signToken(user);

  res.status(201).json({
    message: 'Account created successfully',
    token,
    user: sanitizeUser(user),
  });
});

/**
 * POST /api/auth/verify/upload-docs - Upload verification documents
 */
export const uploadVerificationDocs = asyncHandler(async (req, res) => {
  const { idDocUrl, licenseUrl } = req.body;

  req.user.verification = {
    status: 'pending',
    idDocUrl,
    licenseUrl,
    submittedAt: new Date(),
  };

  await req.user.save();

  res.json({
    message: 'Documents submitted successfully. Verification is pending.',
    verification: req.user.verification,
  });
});

/**
 * GET /api/auth/verify/status - Get verification status
 */
export const verificationStatus = asyncHandler(async (req, res) => {
  res.json({
    status: req.user.verification?.status || 'none',
    verification: req.user.verification,
  });
});

/**
 * PUT /api/auth/password - Change password (authenticated)
 */
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new AppError('Current password and new password are required', 400);
  }

  const user = await User.findById(req.user._id);
  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    throw new AppError('Current password is incorrect', 401);
  }

  user.password = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await user.save();

  res.json({ message: 'Password changed successfully' });
});

/**
 * PUT /api/auth/profile - Update user profile
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;
  const updates = {};

  if (name) updates.name = name.trim();
  if (phone) {
    // Check if phone is already taken by another user
    const existing = await User.findOne({ phone, _id: { $ne: req.user._id } });
    if (existing) {
      throw new AppError('This phone number is already registered', 409);
    }
    updates.phone = phone;
  }

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  }).select('-password -__v');

  res.json({ message: 'Profile updated', user });
});
