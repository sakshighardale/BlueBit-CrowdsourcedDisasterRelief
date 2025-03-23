import mongoose from "mongoose";

const DisasterSchema = new mongoose.Schema(
  {
    location: { type: Object, required: true },
    type: { type: String, required: true },
    severity: { type: String, required: true },
    description: { type: String },
    state: { type: String, required: true }, // ✅ Ensure state is required
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Disaster = mongoose.model("Disaster", DisasterSchema);
export default Disaster;
