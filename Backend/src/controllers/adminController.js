import User from '../models/User.js';
import Ride from '../models/Ride.js';
import Booking from '../models/Booking.js';
import { asyncHandler, AppError } from '../utils/asyncHandler.js';

/**
 * GET /api/admin/users - List all users (with pagination)
 */
export const listUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, role, verification } = req.query;

  const query = {};
  if (role) query.role = role;
  if (verification) query['verification.status'] = verification;

  const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
  const limitNum = Math.min(parseInt(limit, 10), 100);

  const [users, total] = await Promise.all([
    User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    User.countDocuments(query),
  ]);

  res.json({
    users,
    pagination: {
      page: parseInt(page, 10),
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum),
    },
  });
});

/**
 * GET /api/admin/users/:id - Get user details
 */
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Get user's rides and bookings count
  const [ridesCount, bookingsCount] = await Promise.all([
    Ride.countDocuments({ owner: user._id }),
    Booking.countDocuments({ user: user._id }),
  ]);

  res.json({
    user,
    stats: {
      ridesPosted: ridesCount,
      bookingsMade: bookingsCount,
    },
  });
});

/**
 * PUT /api/admin/users/:id/verify - Verify or reject a driver
 */
export const verifyDriver = asyncHandler(async (req, res) => {
  const { status, note } = req.body;

  if (!['verified', 'rejected'].includes(status)) {
    throw new AppError('Status must be verified or rejected', 400);
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (!user.verification?.idDocUrl || !user.verification?.licenseUrl) {
    throw new AppError('User has not submitted verification documents', 400);
  }

  user.verification.status = status;
  user.verification.reviewedAt = new Date();
  user.verification.reviewedBy = req.user._id;
  if (note) user.verification.note = note;

  await user.save();

  res.json({
    message: `Driver ${status === 'verified' ? 'verified' : 'rejected'} successfully`,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      verification: user.verification,
    },
  });
});

/**
 * PUT /api/admin/users/:id/role - Update user role
 */
export const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    throw new AppError('Invalid role', 400);
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Prevent removing own admin role
  if (user._id.toString() === req.user._id.toString() && role !== 'admin') {
    throw new AppError('Cannot remove your own admin role', 400);
  }

  user.role = role;
  await user.save();

  res.json({
    message: `User role updated to ${role}`,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

/**
 * GET /api/admin/stats - Get platform statistics
 */
export const getStats = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalRides,
    totalBookings,
    pendingVerifications,
    activeRides,
  ] = await Promise.all([
    User.countDocuments(),
    Ride.countDocuments(),
    Booking.countDocuments({ status: { $ne: 'cancelled' } }),
    User.countDocuments({ 'verification.status': 'pending' }),
    Ride.countDocuments({ status: 'open' }),
  ]);

  // Get recent activity
  const recentRides = await Ride.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('owner', 'name');

  const recentBookings = await Booking.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', 'name')
    .populate({ path: 'ride', select: 'source destination date' });

  res.json({
    stats: {
      totalUsers,
      totalRides,
      totalBookings,
      pendingVerifications,
      activeRides,
    },
    recent: {
      rides: recentRides,
      bookings: recentBookings,
    },
  });
});

/**
 * DELETE /api/admin/users/:id - Delete a user account
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Prevent self-deletion
  if (user._id.toString() === req.user._id.toString()) {
    throw new AppError('Cannot delete your own account', 400);
  }

  // Cancel all pending rides by this user
  await Ride.updateMany(
    { owner: user._id, status: 'open' },
    { status: 'cancelled' }
  );

  // Cancel all pending bookings by this user
  await Booking.updateMany(
    { user: user._id, status: { $nin: ['cancelled', 'completed'] } },
    { status: 'cancelled', cancelledAt: new Date() }
  );

  await User.findByIdAndDelete(user._id);

  res.json({ message: 'User and associated data cleaned up successfully' });
});
