import Ride from '../models/Ride.js';
import Booking from '../models/Booking.js';

export const bookRide = async (req, res) => {
  const { id } = req.params;
  const { seats = 1 } = req.body;
  const ride = await Ride.findById(id);
  if (!ride) return res.status(404).json({ message: 'Ride not found' });
  if (ride.status !== 'open') return res.status(400).json({ message: 'Ride is not open' });
  if (ride.seatsAvailable < seats) return res.status(400).json({ message: 'Not enough seats' });

  const priceTotal = seats * ride.pricePerSeat;
  const booking = await Booking.create({ user: req.user._id, ride: ride._id, seats, priceTotal });
  ride.seatsAvailable -= seats;
  if (ride.seatsAvailable === 0) ride.status = 'closed';
  await ride.save();

  res.status(201).json({ booking, ride });
};

export const myBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate({ path: 'ride', populate: { path: 'owner', select: 'name phone' } });
  res.json({ bookings });
};
