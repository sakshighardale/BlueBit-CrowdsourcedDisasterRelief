import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import disasterRoutes from "./routes/disasterRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app); // Create HTTP server for Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow frontend connection
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/disasters", disasterRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Socket.io Connection Handling
io.on("connection", (socket) => {
  console.log("🔵 A user connected:", socket.id);

  // Listen for new disaster reports
  socket.on("reportDisaster", (data) => {
    console.log("🚨 New Disaster Reported:", data);
    io.emit("newDisaster", data); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to Disaster Reporting API!");
});

// Start Server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
