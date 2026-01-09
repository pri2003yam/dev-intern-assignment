import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes (will be compiled to dist)
let authRoutes: any = null;
let taskRoutes: any = null;

try {
  authRoutes = require("../dist/routes/auth").default || require("../dist/routes/auth");
  taskRoutes = require("../dist/routes/tasks").default || require("../dist/routes/tasks");
} catch (error) {
  console.error("Error loading routes:", error);
}

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running" });
});

if (authRoutes) app.use("/auth", authRoutes);
if (taskRoutes) app.use("/tasks", taskRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

// Vercel serverless handler
export default (req: Request, res: Response) => {
  app(req, res);
};
