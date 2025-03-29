import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Donation = mongoose.model("Donation", donationSchema);
export default Donation;
