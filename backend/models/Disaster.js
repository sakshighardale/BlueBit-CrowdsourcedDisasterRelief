import mongoose from "mongoose";

const disasterSchema = new mongoose.Schema({
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  type: { type: String, required: true },
  severity: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Disaster", disasterSchema);
