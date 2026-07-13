import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authroutes.js";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskrouter.js";

dotenv.config();
console.log("JWT from .env:", process.env.JWT_SECRET);


connectDB();

const app = express();

app.use(cors({
  origin: ["https://taskmanager-virid-psi.vercel.app", "http://localhost:51"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
    
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task Management API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});