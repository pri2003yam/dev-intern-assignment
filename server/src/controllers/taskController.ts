import { Request, Response } from "express";
import { TaskService } from "../services/taskService";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validators/taskValidators";

const taskService = new TaskService();

export class TaskController {
  // Create a new task
  async createTask(req: Request, res: Response) {
    try {
      const validatedData = createTaskSchema.parse(req.body);
      const userId = req.userId!;

      const task = await taskService.createTask(userId, validatedData);

      res.status(201).json({
        message: "Task created successfully",
        task,
      });
    } catch (error: any) {
      if (error.errors) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Get all tasks for the logged-in user
  async getUserTasks(req: Request, res: Response) {
    try {
      const userId = req.userId!;
      const search = (req.query.search as string) || undefined;
      const status = (req.query.status as string) || undefined;

      const tasks = await taskService.getUserTasks(userId, search, status);

      res.json({
        count: tasks.length,
        tasks,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Update a task
  async updateTask(req: Request, res: Response) {
    try {
      const taskId = parseInt(req.params.id);
      const userId = req.userId!;
      const validatedData = updateTaskSchema.parse(req.body);

      if (isNaN(taskId)) {
        return res.status(400).json({ error: "Invalid task ID" });
      }

      const updatedTask = await taskService.updateTask(taskId, userId, validatedData);

      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.json({
        message: "Task updated successfully",
        task: updatedTask,
      });
    } catch (error: any) {
      if (error.errors) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Delete a task
  async deleteTask(req: Request, res: Response) {
    try {
      const taskId = parseInt(req.params.id);
      const userId = req.userId!;

      if (isNaN(taskId)) {
        return res.status(400).json({ error: "Invalid task ID" });
      }

      const deletedTask = await taskService.deleteTask(taskId, userId);

      if (!deletedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.json({
        message: "Task deleted successfully",
        task: deletedTask,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
