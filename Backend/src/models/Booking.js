import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    ride: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seats: { type: Number, required: true, min: 1 },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' }
  },
  { timestamps: true }
);

bookingSchema.index({ user: 1 });

export default mongoose.model('Booking', bookingSchema);
