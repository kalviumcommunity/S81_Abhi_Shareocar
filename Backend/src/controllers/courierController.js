import CourierRequest from '../models/CourierRequest.js';
import CourierBooking from '../models/CourierBooking.js';
import Ride from '../models/Ride.js';

export const createRequest = async (req, res) => {
  const { pickup, drop, date, time, weightKg, instructions } = req.body;
  if (!pickup || !drop || !date || !time || weightKg == null) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const priceEstimated = Math.max(50, Number(weightKg) * 20);
  const request = await CourierRequest.create({
    user: req.user._id,
    pickup,
    drop,
    date,
    time,
    weightKg,
    instructions,
    priceEstimated
  });
  res.status(201).json({ request });
};

export const myRequests = async (req, res) => {
  const requests = await CourierRequest.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ requests });
};

export const getRequest = async (req, res) => {
  const request = await CourierRequest.findById(req.params.id).populate('user', 'name phone');
  if (!request) return res.status(404).json({ message: 'Request not found' });
  res.json({ request });
};

export const bookOnRide = async (req, res) => {
  const { id } = req.params;
  const { weightKg = 1 } = req.body;
  const ride = await Ride.findById(id);
  if (!ride) return res.status(404).json({ message: 'Ride not found' });
  if (ride.status !== 'open') return res.status(400).json({ message: 'Ride is not open' });
  if (weightKg <= 0) return res.status(400).json({ message: 'Invalid weight' });
  const remaining = (ride.parcelCapacityKg || 0) - (ride.parcelBookedKg || 0);
  if (remaining <= 0) return res.status(400).json({ message: 'No parcel capacity on this ride' });
  if (weightKg > remaining) return res.status(400).json({ message: `Insufficient capacity. Remaining ${remaining}kg` });

  const priceTotal = Number(weightKg) * (ride.pricePerKg || 20);
  const booking = await CourierBooking.create({ user: req.user._id, ride: ride._id, weightKg, priceTotal });
  ride.parcelBookedKg = (ride.parcelBookedKg || 0) + Number(weightKg);
  await ride.save();
  res.status(201).json({ booking, ride });
};

export const myBookings = async (req, res) => {
  const bookings = await CourierBooking.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate({ path: 'ride', populate: { path: 'owner', select: 'name phone' } });
  res.json({ bookings });
};
