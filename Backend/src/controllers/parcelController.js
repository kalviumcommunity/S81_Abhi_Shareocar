import Parcel from '../models/Parcel.js';
import ParcelBooking from '../models/ParcelBooking.js';

export const createParcelSlot = async (req, res) => {
  const { pickup, drop, date, time, capacityKg, pricePerKg, notes } = req.body;
  if (!pickup || !drop || !date || !time || capacityKg == null || pricePerKg == null)
    return res.status(400).json({ message: 'Missing required fields' });
  const slot = await Parcel.create({ owner: req.user._id, pickup, drop, date, time, capacityKg, pricePerKg, notes });
  res.status(201).json({ slot });
};

export const listParcelSlots = async (req, res) => {
  const { pickup, drop, date } = req.query;
  const q = {};
  if (pickup) q.pickup = new RegExp(`^${pickup}`, 'i');
  if (drop) q.drop = new RegExp(`^${drop}`, 'i');
  if (date) q.date = date;
  const slots = await Parcel.find(q).sort({ createdAt: -1 }).populate('owner', 'name verification');
  res.json({ slots });
};

export const getParcelSlot = async (req, res) => {
  const slot = await Parcel.findById(req.params.id).populate('owner', 'name phone');
  if (!slot) return res.status(404).json({ message: 'Slot not found' });
  res.json({ slot });
};

export const bookParcel = async (req, res) => {
  const { id } = req.params;
  const { weightKg = 1 } = req.body;
  const slot = await Parcel.findById(id);
  if (!slot) return res.status(404).json({ message: 'Slot not found' });
  if (slot.status !== 'open') return res.status(400).json({ message: 'Slot is not open' });
  if (weightKg <= 0) return res.status(400).json({ message: 'Invalid weight' });
  if (slot.capacityKg < weightKg) return res.status(400).json({ message: 'Insufficient capacity' });

  const priceTotal = weightKg * slot.pricePerKg;
  const booking = await ParcelBooking.create({ user: req.user._id, parcel: slot._id, weightKg, priceTotal });
  slot.capacityKg -= weightKg;
  if (slot.capacityKg <= 0) slot.status = 'closed';
  await slot.save();
  res.status(201).json({ booking, slot });
};

export const myParcelBookings = async (req, res) => {
  const bookings = await ParcelBooking.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate({ path: 'parcel', populate: { path: 'owner', select: 'name phone' } });
  res.json({ bookings });
};
