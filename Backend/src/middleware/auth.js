import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AppError } from '../utils/asyncHandler.js';

/**
 * Middleware to require authentication.
 * Verifies JWT token and attaches user to request.
 */
export const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const secret = process.env.JWT_SECRET || 'dev-secret';
    const payload = jwt.verify(token, secret);

    // Check token expiration
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return res.status(401).json({ message: 'Token expired' });
    }

    const user = await User.findById(payload.sub);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

/**
 * Middleware to require verified driver status.
 * Must be used after requireAuth.
 */
export const requireVerifiedDriver = (req, res, next) => {
  const status = req.user?.verification?.status;
  if (status !== 'verified') {
    return res.status(403).json({
      message: 'Driver verification required',
      verificationStatus: status || 'none',
    });
  }
  next();
};

/**
 * Middleware to require admin role.
 * Must be used after requireAuth.
 */
export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

/**
 * Middleware to optionally attach user if token provided.
 * Does not fail if no token - useful for public routes that
 * may show different data to authenticated users.
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (token) {
      const secret = process.env.JWT_SECRET || 'dev-secret';
      const payload = jwt.verify(token, secret);
      const user = await User.findById(payload.sub);
      if (user) {
        req.user = user;
      }
    }
  } catch {
    // Ignore errors for optional auth
  }
  next();
};
