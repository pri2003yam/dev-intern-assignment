import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Dynamic imports to load at runtime
let authRoutes: any;
let taskRoutes: any;

async function loadRoutes() {
  try {
    authRoutes = (await import("../dist/routes/auth")).default;
    taskRoutes = (await import("../dist/routes/tasks")).default;
    
    // Routes
    app.get("/", (req, res) => {
      res.json({ message: "Server is running" });
    });

    app.use("/auth", authRoutes);
    app.use("/tasks", taskRoutes);
  } catch (error) {
    console.error("Error loading routes:", error);
    app.get("/", (req, res) => {
      res.json({ message: "Server is starting up, routes not loaded yet" });
    });
  }
}

loadRoutes();

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
