import { Router, Request, Response } from "express";
import { TaskController } from "../controllers/taskController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const taskController = new TaskController();

// All routes are protected by authMiddleware
router.use(authMiddleware);

// POST /tasks - Create a new task
router.post("/", async (req: Request, res: Response) => {
  await taskController.createTask(req, res);
});

// GET /tasks - Get all tasks with optional search and filter
router.get("/", async (req: Request, res: Response) => {
  await taskController.getUserTasks(req, res);
});

// PUT /tasks/:id - Update a task
router.put("/:id", async (req: Request, res: Response) => {
  await taskController.updateTask(req, res);
});

// DELETE /tasks/:id - Delete a task
router.delete("/:id", async (req: Request, res: Response) => {
  await taskController.deleteTask(req, res);
});

export default router;
