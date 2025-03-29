import express from "express";
const donateRoute = express.Router();
import Donation from "../models/Donation.js";

// @desc    Submit donation
donateRoute.post("/donate", async (req, res) => {
  const { name, email, amount, paymentMethod } = req.body;

  if (!name || !email || !amount || !paymentMethod) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newDonation = new Donation({ name, email, amount, paymentMethod });
    await newDonation.save();
    res.status(201).json({ message: "Donation successful!" });
    console.log("Donation Done");
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Get all donations
donateRoute.get("/donations", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ date: -1 });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default donateRoute;
