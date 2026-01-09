import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load routes dynamically at runtime
let routesLoaded = false;

async function loadRoutes() {
  if (routesLoaded) return;
  try {
    const authRoutes = await import("../dist/routes/auth");
    const taskRoutes = await import("../dist/routes/tasks");
    
    app.use("/auth", authRoutes.default);
    app.use("/tasks", taskRoutes.default);
    routesLoaded = true;
  } catch (error) {
    console.error("Error loading routes:", error);
  }
}

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Error handling
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error", details: err.message });
});

// Vercel serverless handler
export default async (req: Request, res: Response) => {
  await loadRoutes();
  app(req, res);
};
