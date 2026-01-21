import Ride from '../models/Ride.js';
import Booking from '../models/Booking.js';
import { asyncHandler, AppError } from '../utils/asyncHandler.js';

/**
 * POST /api/bookings/:id - Book seats on a ride
 */
export const bookRide = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { seats = 1 } = req.body;

  const ride = await Ride.findById(id);

  if (!ride) {
    throw new AppError('Ride not found', 404);
  }

  if (ride.status !== 'open') {
    throw new AppError('This ride is no longer accepting bookings', 400);
  }

  // Prevent owner from booking their own ride
  if (ride.owner.toString() === req.user._id.toString()) {
    throw new AppError('You cannot book your own ride', 400);
  }

  // Check for existing booking
  const existingBooking = await Booking.findOne({
    user: req.user._id,
    ride: ride._id,
    status: { $ne: 'cancelled' },
  });

  if (existingBooking) {
    throw new AppError('You have already booked this ride', 409);
  }

  if (ride.seatsAvailable < seats) {
    throw new AppError(`Only ${ride.seatsAvailable} seats available`, 400);
  }

  const priceTotal = seats * ride.pricePerSeat;

  const booking = await Booking.create({
    user: req.user._id,
    ride: ride._id,
    seats,
    priceTotal,
    status: 'confirmed',
  });

  ride.seatsAvailable -= seats;
  if (ride.seatsAvailable === 0) {
    ride.status = 'closed';
  }
  await ride.save();

  const populatedBooking = await Booking.findById(booking._id)
    .populate({ path: 'ride', populate: { path: 'owner', select: 'name phone' } });

  res.status(201).json({
    message: 'Booking confirmed',
    booking: populatedBooking,
    ride,
  });
});

/**
 * GET /api/bookings - Get current user's bookings
 */
export const myBookings = asyncHandler(async (req, res) => {
  const { status } = req.query;

  const query = { user: req.user._id };
  if (status && status !== 'all') {
    query.status = status;
  }

  const bookings = await Booking.find(query)
    .sort({ createdAt: -1 })
    .populate({ path: 'ride', populate: { path: 'owner', select: 'name phone' } });

  res.json({ bookings });
});

/**
 * GET /api/bookings/:id - Get booking by ID
 */
export const getBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate({ path: 'ride', populate: { path: 'owner', select: 'name phone' } })
    .populate('user', 'name phone');

  if (!booking) {
    throw new AppError('Booking not found', 404);
  }

  // Only allow owner of booking or ride owner to view
  const isBookingOwner = booking.user._id.toString() === req.user._id.toString();
  const isRideOwner = booking.ride.owner._id.toString() === req.user._id.toString();
  const isAdmin = req.user.role === 'admin';

  if (!isBookingOwner && !isRideOwner && !isAdmin) {
    throw new AppError('Access denied', 403);
  }

  res.json({ booking });
});

/**
 * PUT /api/bookings/:id/cancel - Cancel a booking
 */
export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('ride');

  if (!booking) {
    throw new AppError('Booking not found', 404);
  }

  // Only allow booking owner or admin to cancel
  const isOwner = booking.user.toString() === req.user._id.toString();
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    throw new AppError('Only the booking owner can cancel', 403);
  }

  if (booking.status === 'cancelled') {
    throw new AppError('Booking is already cancelled', 400);
  }

  // Check if ride date has passed
  const rideDate = new Date(`${booking.ride.date}T${booking.ride.time}`);
  if (rideDate < new Date()) {
    throw new AppError('Cannot cancel booking for a ride that has already departed', 400);
  }

  // Cancel booking
  booking.status = 'cancelled';
  booking.cancelledAt = new Date();
  await booking.save();

  // Restore seats to the ride if it's not cancelled
  if (booking.ride.status !== 'cancelled') {
    booking.ride.seatsAvailable += booking.seats;
    if (booking.ride.status === 'closed') {
      booking.ride.status = 'open';
    }
    await booking.ride.save();
  }

  res.json({
    message: 'Booking cancelled successfully',
    booking,
  });
});

/**
 * GET /api/bookings/ride/:rideId - Get all bookings for a ride (ride owner only)
 */
export const getRideBookings = asyncHandler(async (req, res) => {
  const ride = await Ride.findById(req.params.rideId);

  if (!ride) {
    throw new AppError('Ride not found', 404);
  }

  // Only ride owner or admin can view bookings
  const isOwner = ride.owner.toString() === req.user._id.toString();
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    throw new AppError('Access denied', 403);
  }

  const bookings = await Booking.find({ ride: ride._id })
    .sort({ createdAt: -1 })
    .populate('user', 'name phone');

  res.json({ bookings });
});
