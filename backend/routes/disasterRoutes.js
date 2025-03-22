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
    const { location, type, severity, description } = req.body;
    const disaster = new Disaster({
      location: JSON.parse(location),
      type,
      severity,
      description,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await disaster.save();
    res.status(201).json({ message: "Disaster reported successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});
const getDisasters = async (req, res) => {
  try {
    const disasters = await Disaster.find();
    res.status(200).json(disasters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

router.get("/all", getDisasters);
export default router;
