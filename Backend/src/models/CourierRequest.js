import mongoose from 'mongoose';

const courierRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickup: { type: String, required: true },
  drop: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  weightKg: { type: Number, required: true, min: 0.1 },
  instructions: { type: String },
  status: { type: String, enum: ['requested', 'assigned', 'completed', 'cancelled'], default: 'requested' },
  priceEstimated: { type: Number }
}, { timestamps: true });

export default mongoose.model('CourierRequest', courierRequestSchema);
