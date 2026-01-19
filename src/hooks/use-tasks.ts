import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { tasksApi } from "../lib/api-client";
import {
  CreateTaskInput,
  Pagination,
  Task,
  TaskQueryParams,
  UpdateTaskInput,
} from "../interfaces/task.interface";
import { toast } from "react-toastify";

// ================Get all tasks============
interface UseTaskResult {
  data: Task[];
  meta: Pagination;
}

export function useTasks(params?: TaskQueryParams) {
  return useQuery<UseTaskResult>({
    queryKey: ["tasks", params],
    queryFn: () => tasksApi.getAll(params),
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}

// ===================Create task ===============
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTaskInput) => tasksApi.createTask(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task created successfully!");
    },
    onError: (error: Error) => {
      const errorMessage = error.message || "Something went wrong";
      toast.error(`Failed: ${errorMessage}`);
    },
  });
}

// // =================Get single task by ID===============
// export function useTask(id: string | null) {
//   return useQuery({
//     queryKey: ["task", id],
//     queryFn: () => tasksApi.getById(id!),
//     enabled: !!id,
//   });
// }

// ====================Update task==============
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateTaskInput }) =>
      tasksApi.updateTask(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update task: ${error.message}`);
    },
  });
}

// // =======================Delete task===============
// export function useDeleteTask() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: string) => tasksApi.delete(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["tasks"] });
//       toast.success("Task deleted successfully!");
//     },
//     onError: (error: Error) => {
//       toast.error(`Failed to delete task: ${error.message}`);
//     },
//   });
// }
