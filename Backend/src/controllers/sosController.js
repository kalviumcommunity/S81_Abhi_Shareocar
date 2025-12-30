import { z } from 'zod';
import SOSAlert from '../models/SOSAlert.js';

export const createSOS = async (req, res) => {
  const schema = z.object({ body: z.object({ lat: z.number().optional(), lng: z.number().optional(), message: z.string().optional() }) });
  const parse = schema.safeParse({ body: req.body });
  if (!parse.success) return res.status(400).json({ message: 'Invalid data' });
  const { lat, lng, message } = parse.data.body;
  const alert = await SOSAlert.create({ user: req.user._id, location: { lat, lng }, message });
  res.status(201).json({ alert });
};

export const listSOS = async (req, res) => {
  const alerts = await SOSAlert.find().populate('user', 'name email phone').sort({ createdAt: -1 });
  res.json({ alerts });
};

export const resolveSOS = async (req, res) => {
  const alert = await SOSAlert.findById(req.params.id);
  if (!alert) return res.status(404).json({ message: 'Alert not found' });
  alert.resolved = true;
  await alert.save();
  res.json({ alert });
};
