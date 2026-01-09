import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "../src/routes/auth";
import taskRoutes from "../src/routes/tasks";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Error handling
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

// Vercel serverless handler
export default (req: Request, res: Response) => {
  app(req, res);
};
