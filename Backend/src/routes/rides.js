import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { postRide, listRides, getRide, updateRideStatus } from '../controllers/rideController.js';

const r = Router();

r.get('/', listRides);
r.get('/:id', getRide);
r.post('/', auth, postRide);
r.patch('/:id/status', auth, updateRideStatus);
r.put('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { seatsAvailable, pricePerSeat, parcelCapacityKg, pricePerKg, notes } = req.body;
  
    try {
      // Logic to update the ride details in the database
      // For example:
      // const updatedRide = await Ride.findByIdAndUpdate(id, req.body, { new: true });
  
      res.status(200).json({ message: 'Ride updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating ride', error });
    }
  });

export default r;
