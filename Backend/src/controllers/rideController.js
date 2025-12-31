import Ride from '../models/Ride.js';

export const createRide = async (req, res) => {
  const { source, destination, date, time, seatsAvailable, pricePerSeat, vehicle, notes, parcelCapacityKg, pricePerKg } = req.body;
  if (!source || !destination || !date || !time || seatsAvailable == null || pricePerSeat == null)
    return res.status(400).json({ message: 'Missing required fields' });
  const ride = await Ride.create({
    owner: req.user._id,
    source,
    destination,
    date,
    time,
    seatsAvailable,
    pricePerSeat,
    parcelCapacityKg: parcelCapacityKg ?? 0,
    pricePerKg: pricePerKg ?? 20,
    vehicle,
    notes,
  });
  res.status(201).json({ ride });
};

export const listRides = async (req, res) => {
  const { source, destination, date } = req.query;
  const q = {};
  if (source) q.source = new RegExp(`^${source}`, 'i');
  if (destination) q.destination = new RegExp(`^${destination}`, 'i');
  if (date) q.date = date;
  const rides = await Ride.find(q).sort({ createdAt: -1 }).populate('owner', 'name verification');
  res.json({ rides });
};

export const getRide = async (req, res) => {
  const ride = await Ride.findById(req.params.id).populate('owner', 'name verification phone');
  if (!ride) return res.status(404).json({ message: 'Ride not found' });
  res.json({ ride });
};

export const updateRide = async (req, res) => {
  const { id } = req.params;
  const ride = await Ride.findById(id);
  if (!ride) return res.status(404).json({ message: 'Ride not found' });
  if (ride.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Only the owner can update this ride' });

  const allowed = [
    'source', 'destination', 'date', 'time', 'seatsAvailable', 'pricePerSeat',
    'parcelCapacityKg', 'pricePerKg', 'notes', 'status', 'vehicle'
  ];
  for (const key of allowed) {
    if (key in req.body) {
      ride[key] = req.body[key];
    }
  }
  await ride.save();
  const populated = await Ride.findById(id).populate('owner', 'name verification phone');
  res.json({ ride: populated });
};
