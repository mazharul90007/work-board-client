"use client";

import { useState } from "react";
import {
  useTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from "@/src/hooks/use-tasks";
import { TaskForm } from "./task-form";
import { TaskStatus, Priority, type Task } from "@/src/lib/api-client";

const statusColors = {
  [TaskStatus.TODO]: "bg-slate-500 text-white",
  [TaskStatus.IN_PROGRESS]: "bg-blue-500 text-white",
  [TaskStatus.DONE]: "bg-green-500 text-white",
};

const priorityColors = {
  [Priority.LOW]: "bg-gray-100 text-gray-800 border-gray-300",
  [Priority.MEDIUM]: "bg-yellow-100 text-yellow-800 border-yellow-300",
  [Priority.HIGH]: "bg-red-100 text-red-800 border-red-300",
};

const statusLabels = {
  [TaskStatus.TODO]: "To Do",
  [TaskStatus.IN_PROGRESS]: "In Progress",
  [TaskStatus.DONE]: "Done",
};

export function TaskList() {
  const { data: tasks, isLoading } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const handleCreate = (data: {
    title: string;
    description: string;
    status: TaskStatus;
    priority: Priority;
    userId: string;
  }) => {
    createTask.mutate(data, {
      onSuccess: () => {
        setIsFormOpen(false);
      },
    });
  };

  const handleUpdate = (data: {
    title: string;
    description: string;
    status: TaskStatus;
    priority: Priority;
    userId: string;
  }) => {
    if (editingTask) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { userId, ...updateData } = data;
      updateTask.mutate(
        { id: editingTask.id, input: updateData },
        {
          onSuccess: () => {
            setEditingTask(null);
            setIsFormOpen(false);
          },
        }
      );
    }
  };

  const handleDelete = () => {
    if (taskToDelete) {
      deleteTask.mutate(taskToDelete.id, {
        onSuccess: () => {
          setTaskToDelete(null);
        },
      });
    }
  };

  const openCreateForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEditForm = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 font-bold">Tasks</h2>
        <button
          onClick={openCreateForm}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Task
        </button>
      </div>

      {isFormOpen && (
        <TaskForm
          key={editingTask?.id ?? "create"}
          task={editingTask || undefined}
          onSubmit={editingTask ? handleUpdate : handleCreate}
          onCancel={closeForm}
          isLoading={createTask.isPending || updateTask.isPending}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks?.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                  {task.title}
                </h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                    statusColors[task.status]
                  }`}
                >
                  {statusLabels[task.status]}
                </span>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {task.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {task.description}
                </p>
              )}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium border ${
                    priorityColors[task.priority]
                  }`}
                >
                  {task.priority}
                </span>
                <span className="text-xs text-gray-500">
                  Assigned to: {task.user.name || task.user.email}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => openEditForm(task)}
                  className="px-3 py-1.5 text-sm bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => setTaskToDelete(task)}
                  className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tasks?.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
          <p className="text-center text-gray-600">
            No tasks found. Create your first task!
          </p>
        </div>
      )}

      {taskToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are you sure?
              </h3>
              <p className="text-sm text-gray-600">
                This will permanently delete the task &quot;
                {taskToDelete?.title}&quot; and cannot be undone.
              </p>
            </div>
            <div className="p-6 pt-0 flex gap-2 justify-end">
              <button
                onClick={() => setTaskToDelete(null)}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
