import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import disasterRoutes from "./routes/disasterRoutes.js";
import authRoutes from "./routes/authRoutes.js";


// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(express.json());
app.use(cookieParser()); // Add cookie parser middleware
app.use(cors({
  origin: process.env.CLIENT_URL, // Replace with your frontend URL
  credentials: true // Allow credentials (cookies)
}));

app.use('/api/auth', authRoutes); // Add this line
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
