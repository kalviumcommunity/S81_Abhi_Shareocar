import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ride: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
    seats: { type: Number, required: true, min: 1 },
    priceTotal: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'confirmed',
    },
    cancelledAt: { type: Date },
    notes: { type: String, maxlength: 500 },
  },
  { timestamps: true }
);

// Indexes for efficient queries
bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ ride: 1, status: 1 });

export default mongoose.model('Booking', bookingSchema);
