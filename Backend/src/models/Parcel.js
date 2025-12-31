import mongoose from 'mongoose';

const parcelSlotSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pickup: { type: String, required: true },
    drop: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    capacityKg: { type: Number, required: true, min: 0 },
    pricePerKg: { type: Number, required: true, min: 0 },
    notes: String,
    status: { type: String, enum: ['open', 'closed', 'cancelled'], default: 'open' },
  },
  { timestamps: true }
);

parcelSlotSchema.index({ pickup: 1, drop: 1, date: 1 });

export default mongoose.model('Parcel', parcelSlotSchema);
