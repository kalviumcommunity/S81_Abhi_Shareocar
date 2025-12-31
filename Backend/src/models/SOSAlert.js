import mongoose from 'mongoose';

const sosSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['police', 'ambulance', 'contact'], required: true },
    location: {
      lat: Number,
      lng: Number,
    },
    sentTo: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('SOSAlert', sosSchema);
