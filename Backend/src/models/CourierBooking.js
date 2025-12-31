import mongoose from 'mongoose';

const courierBookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ride: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
  weightKg: { type: Number, required: true, min: 0.1 },
  priceTotal: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['booked', 'completed', 'cancelled'], default: 'booked' }
}, { timestamps: true });

courierBookingSchema.index({ user: 1 });

export default mongoose.model('CourierBooking', courierBookingSchema);
