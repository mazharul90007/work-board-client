"use client";

import { useState } from "react";
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "@/src/hooks/use-users";
import { UserForm } from "./user-form";
import type { User } from "@/src/lib/api-client";

export function UserList() {
  const { data: users, isLoading } = useUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleCreate = (data: { name: string; email: string }) => {
    createUser.mutate(data, {
      onSuccess: () => {
        setIsFormOpen(false);
      },
    });
  };

  const handleUpdate = (data: { name: string; email: string }) => {
    if (editingUser) {
      updateUser.mutate(
        { id: editingUser.id, input: data },
        {
          onSuccess: () => {
            setEditingUser(null);
            setIsFormOpen(false);
          },
        }
      );
    }
  };

  const handleDelete = () => {
    if (userToDelete) {
      deleteUser.mutate(userToDelete.id, {
        onSuccess: () => {
          setUserToDelete(null);
        },
      });
    }
  };

  const openCreateForm = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const openEditForm = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
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
        <h2 className="text-2xl font-bold text-gray-900">Users</h2>
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
          Add User
        </button>
      </div>

      {isFormOpen && (
        <UserForm
          key={editingUser?.id ?? "create"}
          user={editingUser || undefined}
          onSubmit={editingUser ? handleUpdate : handleCreate}
          onCancel={closeForm}
          isLoading={createUser.isPending || updateUser.isPending}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users?.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {user.name || "No name"}
              </h3>
            </div>
            <div className="p-6 space-y-2">
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-500">
                Created: {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => openEditForm(user)}
                  className="px-3 py-1.5 text-sm bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => setUserToDelete(user)}
                  className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {users?.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
          <p className="text-center text-gray-600">
            No users found. Create your first user!
          </p>
        </div>
      )}

      {userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are you sure?
              </h3>
              <p className="text-sm text-gray-600">
                This will permanently delete the user &quot;{userToDelete?.name}
                &quot; and cannot be undone.
              </p>
            </div>
            <div className="p-6 pt-0 flex gap-2 justify-end">
              <button
                onClick={() => setUserToDelete(null)}
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
