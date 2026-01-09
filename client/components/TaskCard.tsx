"use client";

import { Task, useDeleteTask, useUpdateTask } from "@/hooks/useTasks";
import { Trash2, Edit2, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { EditTaskDialog } from "./EditTaskDialog";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id, {
        onSuccess: () => {
          toast.success("Task deleted successfully");
        },
        onError: () => {
          toast.error("Failed to delete task");
        },
      });
    }
  };

  const getStatusIcon = () => {
    switch (task.status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (task.status) {
      case "completed":
        return "bg-green-500/10 text-green-700";
      case "in-progress":
        return "bg-blue-500/10 text-blue-700";
      default:
        return "bg-yellow-500/10 text-yellow-700";
    }
  };

  const getStatusBgColor = () => {
    switch (task.status) {
      case "completed":
        return "bg-green-500/20";
      case "in-progress":
        return "bg-blue-500/20";
      default:
        return "bg-yellow-500/20";
    }
  };

  return (
    <>
      <div className={`p-6 border border-border rounded-lg ${getStatusBgColor()}`}>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {getStatusIcon()}
              <h3 className="text-lg font-semibold text-foreground">{task.title}</h3>
            </div>
            {task.description && (
              <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
            )}
            <div className="flex items-center gap-4">
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getStatusColor()}`}>
                {task.status}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsEditOpen(true)}
              className="p-2 hover:bg-accent rounded-md transition-colors"
              title="Edit task"
            >
              <Edit2 className="w-4 h-4 text-primary" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 hover:bg-destructive/20 rounded-md transition-colors disabled:opacity-50"
              title="Delete task"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </button>
          </div>
        </div>
      </div>

      <EditTaskDialog
        task={task}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </>
  );
}
