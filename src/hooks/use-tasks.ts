import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  tasksApi,
  type CreateTaskInput,
  type UpdateTaskInput,
} from "@/src/lib/api-client";

// ================Get all tasks============
export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: tasksApi.getAll,
  });
}

// =================Get single task by ID===============
export function useTask(id: string | null) {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => tasksApi.getById(id!),
    enabled: !!id,
  });
}

// ===================Create task ===============
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTaskInput) => tasksApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task created successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create task: ${error.message}`);
    },
  });
}

// ====================Update task==============
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateTaskInput }) =>
      tasksApi.update(id, input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", data.id] });
      toast.success("Task updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update task: ${error.message}`);
    },
  });
}

// =======================Delete task===============
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tasksApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete task: ${error.message}`);
    },
  });
}
