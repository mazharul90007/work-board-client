"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import {
  Priority,
  Task,
  UpdateTaskInput,
} from "@/src/interfaces/task.interface";
import { useUpdateTask } from "@/src/hooks/use-tasks";
import { User } from "@/src/interfaces/user.interface";

interface TaskFormValues {
  title: string;
  description: string;
  priority: Priority;
  assignedToId: string;
  dueDate: string;
}

export default function UpdateTaskModal({
  isOpen,
  onClose,
  users,
  task,
}: {
  isOpen: boolean;
  onClose: () => void;
  users?: User[];
  task: Task | null;
}) {
  const { mutate: updateTask, isPending } = useUpdateTask();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>();

  useEffect(() => {
    if (isOpen && task) {
      reset({
        title: task.title ?? "",
        description: task.description ?? "",
        priority: task.priority ?? Priority.MEDIUM,
        assignedToId: task.assignedTo?.id ?? "",
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [task, isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = (data: TaskFormValues) => {
    if (!task?.id) return;

    const updateInput: UpdateTaskInput = {
      title: data.title,
      description: data.description,
      priority: data.priority,
      assignedToId: data.assignedToId,
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
    };

    updateTask(
      { id: task.id, input: updateInput },
      { onSuccess: () => onClose() },
    );
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 text-slate-900">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">
            Edit Task Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Assigned To */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Assigned To
            </label>
            <select
              {...register("assignedToId", {
                required: "Assignee is required",
              })}
              className={`w-full px-4 py-2 rounded-lg border outline-none text-sm transition-all ${
                errors.assignedToId
                  ? "border-red-500"
                  : "border-slate-200 focus:ring-2 focus:ring-purple-500"
              }`}
            >
              <option value="">Select a team member</option>
              {users?.map((u) => (
                <option key={u.id} value={u.id}>
                  {u?.name ? u.name : "No name"} ({u.email})
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              className={`w-full px-4 py-2 rounded-lg border outline-none transition-all text-sm ${
                errors.title
                  ? "border-red-500"
                  : "border-slate-200 focus:ring-2 focus:ring-purple-500"
              }`}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none text-sm h-24 resize-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Priority
              </label>
              <select
                {...register("priority")}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none text-sm focus:ring-2 focus:ring-purple-500"
              >
                <option value={Priority.LOW}>Low</option>
                <option value={Priority.MEDIUM}>Medium</option>
                <option value={Priority.HIGH}>High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Due Date
              </label>
              <input
                {...register("dueDate")}
                type="date"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none text-sm focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg disabled:opacity-50 cursor-pointer mt-4"
          >
            {isPending ? "Updating..." : "Update Task"}
          </button>
        </form>
      </div>
    </div>
  );
}
