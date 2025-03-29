import express from "express";
import axios from "axios";

const mlRoutes = express.Router();

// ML Prediction Route
mlRoutes.post("/predict", async (req, res) => {
    try {
        const mlResponse = await axios.post("http://localhost:5100/predict", req.body);
        res.json(mlResponse.data);
    } catch (error) {
        res.status(500).json({ error: "Error connecting to ML model" });
    }
});

export default mlRoutes;
