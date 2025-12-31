import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ride: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
    seats: { type: Number, required: true, min: 1 },
    priceTotal: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  },
  { timestamps: true }
);

bookingSchema.index({ user: 1 });

export default mongoose.model('Booking', bookingSchema);
