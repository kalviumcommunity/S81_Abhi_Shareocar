import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
  {
    model: String,
    plate: String,
    color: String
  },
  { _id: false }
);

const rideSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    seatsAvailable: { type: Number, required: true, min: 0 },
    pricePerSeat: { type: Number, required: true, min: 0 },
    vehicle: vehicleSchema,
    status: { type: String, enum: ['open', 'closed', 'cancelled'], default: 'open' }
  },
  { timestamps: true }
);

rideSchema.index({ source: 1, destination: 1, date: 1 });

export default mongoose.model('Ride', rideSchema);
