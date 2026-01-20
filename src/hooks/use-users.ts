"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { usersApi } from "../lib/api-client";
import {
  CreateUserInput,
  User,
  UserQueryParams,
} from "../interfaces/user.interface";
import { Pagination } from "../interfaces/task.interface";
import { toast } from "react-toastify";

// ============================Get all users================
export function useGetUsers(params?: UserQueryParams) {
  interface UseUserResult {
    data: User[];
    meta: Pagination;
  }
  return useQuery<UseUserResult>({
    queryKey: ["users", params],
    queryFn: async () => await usersApi.getAll(params),

    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}

// =====================Create User===================
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateUserInput) => usersApi.createUser(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully!");
    },
    onError: (error: Error) => {
      const errorMessage = error.message || "Something went wrong";
      toast.error(`Failed: ${errorMessage}`);
    },
  });
}

// =====================Get single user by ID===================
// export function useUser(id: string | null) {
//   return useQuery({
//     queryKey: ["user", id],
//     queryFn: () => usersApi.getById(id!),
//     enabled: !!id,
//   });
// }

// // ==========================Update user=================
// export function useUpdateUser() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, input }: { id: string; input: UpdateUserInput }) =>
//       usersApi.update(id, input),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//       queryClient.invalidateQueries({ queryKey: ["user", data.id] });
//       toast.success("User updated successfully!");
//     },
//     onError: (error: Error) => {
//       toast.error(`Failed to update user: ${error.message}`);
//     },
//   });
// }

// // ============================Delete user======================
// export function useDeleteUser() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: string) => usersApi.delete(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//       toast.success("User deleted successfully!");
//     },
//     onError: (error: Error) => {
//       toast.error(`Failed to delete user: ${error.message}`);
//     },
//   });
// }
