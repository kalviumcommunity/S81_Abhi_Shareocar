import { z } from 'zod';
import Ride from '../models/Ride.js';
import Booking from '../models/Booking.js';

export const bookRide = async (req, res) => {
  const schema = z.object({ body: z.object({ seats: z.number().int().min(1) }) });
  const parse = schema.safeParse({ body: req.body });
  if (!parse.success) return res.status(400).json({ message: 'Invalid data' });
  const ride = await Ride.findById(req.params.rideId);
  if (!ride || ride.status !== 'open') return res.status(400).json({ message: 'Ride unavailable' });
  const seats = parse.data.body.seats;
  if (ride.seatsAvailable < seats) return res.status(400).json({ message: 'Not enough seats' });
  ride.seatsAvailable -= seats;
  await ride.save();
  const amount = seats * ride.pricePerSeat;
  const booking = await Booking.create({ ride: ride._id, user: req.user._id, seats, amount });
  res.status(201).json({ booking });
};

export const myBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('ride').sort({ createdAt: -1 });
  res.json({ bookings });
};
