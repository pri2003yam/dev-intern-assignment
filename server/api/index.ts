import express from "express";
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
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
