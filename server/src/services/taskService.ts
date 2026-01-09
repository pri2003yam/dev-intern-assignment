import prisma from "../lib/db";
import { CreateTaskInput, UpdateTaskInput } from "../validators/taskValidators";

export class TaskService {
  // Create a new task
  async createTask(userId: number, data: CreateTaskInput) {
    return await prisma.task.create({
      data: {
        title: data.title,
        description: data.description || null,
        status: data.status || "pending",
        userId,
      },
    });
  }

  // Get all tasks for a user with optional search and filter
  async getUserTasks(
    userId: number,
    search?: string,
    status?: string
  ) {
    const where: any = { userId };

    if (search) {
      where.title = { contains: search, mode: "insensitive" };
    }

    if (status) {
      where.status = status;
    }

    return await prisma.task.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  // Get a single task by ID
  async getTaskById(taskId: number, userId: number) {
    return await prisma.task.findFirst({
      where: {
        id: taskId,
        userId, // Ensure user owns the task
      },
    });
  }

  // Update a task
  async updateTask(taskId: number, userId: number, data: UpdateTaskInput) {
    // Verify task belongs to user
    const task = await this.getTaskById(taskId, userId);
    if (!task) {
      return null;
    }

    return await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.status && { status: data.status }),
      },
    });
  }

  // Delete a task
  async deleteTask(taskId: number, userId: number) {
    // Verify task belongs to user
    const task = await this.getTaskById(taskId, userId);
    if (!task) {
      return null;
    }

    return await prisma.task.delete({
      where: { id: taskId },
    });
  }
}
