import { z } from 'zod';
import Ride from '../models/Ride.js';

export const postRide = async (req, res) => {
  const schema = z.object({
    body: z.object({
      source: z.string().min(2),
      destination: z.string().min(2),
      date: z.string().min(8),
      time: z.string().min(4),
      seatsAvailable: z.number().int().min(1),
      pricePerSeat: z.number().min(0),
      vehicle: z.object({ model: z.string().optional(), plate: z.string().optional(), color: z.string().optional() }).optional()
    })
  });
  const parse = schema.safeParse({ body: req.body });
  if (!parse.success) return res.status(400).json({ message: 'Invalid data', errors: parse.error.issues });
  const ride = await Ride.create({ ...parse.data.body, owner: req.user._id });
  res.status(201).json({ ride });
};

export const listRides = async (req, res) => {
  const { source, destination, date, priceMax, seatsMin } = req.query;
  const q = {};
  if (source) q.source = new RegExp(`^${source}`, 'i');
  if (destination) q.destination = new RegExp(`^${destination}`, 'i');
  if (date) q.date = date;
  if (seatsMin) q.seatsAvailable = { $gte: Number(seatsMin) };
  if (priceMax) q.pricePerSeat = { $lte: Number(priceMax) };
  q.status = 'open';
  const rides = await Ride.find(q).sort({ createdAt: -1 }).limit(200);
  res.json({ rides });
};

export const getRide = async (req, res) => {
  const ride = await Ride.findById(req.params.id);
  if (!ride) return res.status(404).json({ message: 'Ride not found' });
  res.json({ ride });
};

export const updateRideStatus = async (req, res) => {
  const { status } = req.body;
  const ride = await Ride.findOne({ _id: req.params.id, owner: req.user._id });
  if (!ride) return res.status(404).json({ message: 'Ride not found' });
  ride.status = status;
  await ride.save();
  res.json({ ride });
};
