import express from "express";
import multer from "multer";
import Disaster from "../models/Disaster.js";

const router = express.Router();

// Multer Setup for Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Report a Disaster
router.post("/report", upload.single("image"), async (req, res) => {
  try {
    const { location, type, severity, description, state } = req.body; // ✅ Added state

    if (!state) {
      return res.status(400).json({ error: "State field is required." });
    }

    // Ensure location is parsed correctly
    let parsedLocation;
    try {
      parsedLocation =
        typeof location === "string" ? JSON.parse(location) : location;
    } catch (error) {
      return res.status(400).json({ error: "Invalid location format" });
    }

    const disaster = new Disaster({
      location: parsedLocation,
      type,
      severity,
      description,
      state, // ✅ Added state
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await disaster.save();
    res
      .status(201)
      .json({ message: "Disaster reported successfully", disaster });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get All Disasters
router.get("/all", async (req, res) => {
  try {
    const disasters = await Disaster.find();
    res.status(200).json(disasters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
