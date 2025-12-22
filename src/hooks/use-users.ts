"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  usersApi,
  type CreateUserInput,
  type UpdateUserInput,
} from "@/src/lib/api-client";

// ============================Get all users================
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: usersApi.getAll,
  });
}

// =====================Get single user by ID===================
export function useUser(id: string | null) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => usersApi.getById(id!),
    enabled: !!id,
  });
}

// =====================Create user=================
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateUserInput) => usersApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create user: ${error.message}`);
    },
  });
}

// ==========================Update user=================
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateUserInput }) =>
      usersApi.update(id, input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", data.id] });
      toast.success("User updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update user: ${error.message}`);
    },
  });
}

// ============================Delete user======================
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete user: ${error.message}`);
    },
  });
}
