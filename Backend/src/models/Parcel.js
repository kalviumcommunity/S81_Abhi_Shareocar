import mongoose from 'mongoose';

const parcelSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    size: { type: String, required: true },
    weight: { type: Number, required: true },
    pickup: { type: String, required: true },
    drop: { type: String, required: true },
    estimatedCost: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

parcelSchema.index({ user: 1, status: 1 });

export default mongoose.model('Parcel', parcelSchema);
