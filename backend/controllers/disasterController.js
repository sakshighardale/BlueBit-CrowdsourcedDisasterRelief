import Disaster from "../models/Disaster.js";

export const reportDisaster = async (req, res) => {
  try {
    const { location, type, severity, description } = req.body;
    console.log("Received Disaster Report:", req.body);

    if (!location || !type || !severity || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const disaster = new Disaster({ location, type, severity, description });
    await disaster.save();

    res.status(201).json({ message: "Disaster reported successfully" });
  } catch (error) {
    console.error("Error reporting disaster:", error.message);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

export const getDisasters = async (req, res) => {
  try {
    console.log("Fetching all disasters...");
    const disasters = await Disaster.find();
    res.status(200).json(disasters);
  } catch (error) {
    console.error("Error fetching disasters:", error.message);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};
