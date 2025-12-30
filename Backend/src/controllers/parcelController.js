import { z } from 'zod';
import Parcel from '../models/Parcel.js';

export const createParcel = async (req, res) => {
  const schema = z.object({
    body: z.object({
      size: z.string().min(1),
      weight: z.number().min(0),
      pickup: z.string().min(2),
      drop: z.string().min(2),
      estimatedCost: z.number().min(0)
    })
  });
  const parse = schema.safeParse({ body: req.body });
  if (!parse.success) return res.status(400).json({ message: 'Invalid data', errors: parse.error.issues });
  const parcel = await Parcel.create({ ...parse.data.body, user: req.user._id });
  res.status(201).json({ parcel });
};

export const myParcels = async (req, res) => {
  const parcels = await Parcel.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ parcels });
};

export const acceptParcel = async (req, res) => {
  const parcel = await Parcel.findById(req.params.id);
  if (!parcel) return res.status(404).json({ message: 'Parcel not found' });
  parcel.status = 'accepted';
  parcel.acceptedBy = req.user._id;
  await parcel.save();
  res.json({ parcel });
};
