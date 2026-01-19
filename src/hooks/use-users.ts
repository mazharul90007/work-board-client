"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { usersApi } from "../lib/api-client";
import { User } from "../interfaces/user.interface";

// ============================Get all users================
export function useGetUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => await usersApi.getAll(),

    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
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
