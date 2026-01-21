import Ride from '../models/Ride.js';
import Booking from '../models/Booking.js';
import { asyncHandler, AppError } from '../utils/asyncHandler.js';

/**
 * POST /api/rides - Create a new ride
 */
export const createRide = asyncHandler(async (req, res) => {
  const {
    source,
    destination,
    date,
    time,
    seatsAvailable,
    pricePerSeat,
    vehicle,
    notes,
    parcelCapacityKg,
    pricePerKg,
  } = req.body;

  // Check if user already has a ride on the same date/time
  const existingRide = await Ride.findOne({
    owner: req.user._id,
    date,
    time,
    status: { $ne: 'cancelled' },
  });

  if (existingRide) {
    throw new AppError('You already have a ride scheduled at this time', 409);
  }

  const ride = await Ride.create({
    owner: req.user._id,
    source: source.trim(),
    destination: destination.trim(),
    date,
    time,
    seatsAvailable,
    pricePerSeat,
    parcelCapacityKg: parcelCapacityKg ?? 0,
    pricePerKg: pricePerKg ?? 20,
    vehicle,
    notes: notes?.trim(),
  });

  const populated = await Ride.findById(ride._id).populate('owner', 'name verification');

  res.status(201).json({
    message: 'Ride created successfully',
    ride: populated,
  });
});

/**
 * GET /api/rides - List rides with optional filters
 */
export const listRides = asyncHandler(async (req, res) => {
  const { source, destination, date, status = 'open', page = 1, limit = 20 } = req.query;

  const query = {};

  if (source) query.source = new RegExp(`^${escapeRegex(source)}`, 'i');
  if (destination) query.destination = new RegExp(`^${escapeRegex(destination)}`, 'i');
  if (date) query.date = date;
  if (status && status !== 'all') query.status = status;

  const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
  const limitNum = Math.min(parseInt(limit, 10), 100);

  const [rides, total] = await Promise.all([
    Ride.find(query)
      .sort({ date: 1, time: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('owner', 'name verification'),
    Ride.countDocuments(query),
  ]);

  res.json({
    rides,
    pagination: {
      page: parseInt(page, 10),
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum),
    },
  });
});

/**
 * GET /api/rides/my - Get current user's rides
 */
export const myRides = asyncHandler(async (req, res) => {
  const rides = await Ride.find({ owner: req.user._id })
    .sort({ date: -1, time: -1 })
    .populate('owner', 'name verification');

  res.json({ rides });
});

/**
 * GET /api/rides/:id - Get ride by ID
 */
export const getRide = asyncHandler(async (req, res) => {
  const ride = await Ride.findById(req.params.id).populate('owner', 'name verification phone');

  if (!ride) {
    throw new AppError('Ride not found', 404);
  }

  // Get bookings for this ride if user is the owner
  let bookings = [];
  if (req.user && ride.owner._id.toString() === req.user._id.toString()) {
    bookings = await Booking.find({ ride: ride._id, status: { $ne: 'cancelled' } })
      .populate('user', 'name phone');
  }

  res.json({ ride, bookings });
});

/**
 * PUT /api/rides/:id - Update a ride
 */
export const updateRide = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ride = await Ride.findById(id);

  if (!ride) {
    throw new AppError('Ride not found', 404);
  }

  if (ride.owner.toString() !== req.user._id.toString()) {
    throw new AppError('Only the owner can update this ride', 403);
  }

  // Prevent updates to closed/cancelled rides (except status change)
  if (ride.status !== 'open' && !('status' in req.body)) {
    throw new AppError(`Cannot update a ${ride.status} ride`, 400);
  }

  const allowed = [
    'source', 'destination', 'date', 'time', 'seatsAvailable', 'pricePerSeat',
    'parcelCapacityKg', 'pricePerKg', 'notes', 'status', 'vehicle',
  ];

  for (const key of allowed) {
    if (key in req.body) {
      ride[key] = req.body[key];
    }
  }

  await ride.save();
  const populated = await Ride.findById(id).populate('owner', 'name verification phone');

  res.json({ message: 'Ride updated', ride: populated });
});

/**
 * DELETE /api/rides/:id - Delete a ride
 */
export const deleteRide = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ride = await Ride.findById(id);

  if (!ride) {
    throw new AppError('Ride not found', 404);
  }

  // Allow owner or admin to delete
  const isOwner = ride.owner.toString() === req.user._id.toString();
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    throw new AppError('Only the owner or admin can delete this ride', 403);
  }

  // Check for active bookings
  const activeBookings = await Booking.countDocuments({
    ride: ride._id,
    status: { $nin: ['cancelled'] },
  });

  if (activeBookings > 0) {
    // Cancel ride instead of deleting if there are bookings
    ride.status = 'cancelled';
    await ride.save();

    return res.json({
      message: 'Ride has active bookings and has been cancelled instead of deleted',
      ride,
    });
  }

  await Ride.findByIdAndDelete(id);

  res.json({ message: 'Ride deleted successfully' });
});

/**
 * Escape special regex characters in search strings
 */
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
