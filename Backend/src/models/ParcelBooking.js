import mongoose from 'mongoose';

const parcelBookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    parcel: { type: mongoose.Schema.Types.ObjectId, ref: 'Parcel', required: true },
    weightKg: { type: Number, required: true, min: 0.1 },
    priceTotal: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  },
  { timestamps: true }
);

parcelBookingSchema.index({ user: 1 });

export default mongoose.model('ParcelBooking', parcelBookingSchema);
