import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: "pending" | "in-progress" | "completed";
  createdAt: string;
  userId: number;
}

export interface GetTasksParams {
  search?: string;
  status?: string;
}

// Fetch all tasks
export function useGetTasks(params?: GetTasksParams) {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: async () => {
      const response = await api.get<{ count: number; tasks: Task[] }>(
        "/tasks",
        { params }
      );
      return response.data.tasks;
    },
  });
}

// Create a task
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { title: string; description?: string; status?: string }) => {
      const response = await api.post("/tasks", data);
      return response.data.task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

// Update a task
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: { title?: string; description?: string; status?: string };
    }) => {
      const response = await api.put(`/tasks/${id}`, data);
      return response.data.task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

// Delete a task
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/tasks/${id}`);
      return response.data.task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
