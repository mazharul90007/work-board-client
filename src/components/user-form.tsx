"use client";

import { useForm } from "react-hook-form";
import type { User } from "@/src/lib/api-client";
import { useEffect } from "react";
import { FaRegUser } from "react-icons/fa";

interface UserFormProps {
  user?: User;
  onSubmit: (data: { name: string; email: string }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

interface UserFormData {
  name: string;
  email: string;
}

export function UserForm({
  user,
  onSubmit,
  onCancel,
  isLoading,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email,
      });
    }
  }, [user, reset]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          {user ? "Edit User" : "Create New User"}
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="p-6 pt-0 flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-main text-white rounded-md hover:bg-main-dark focus:outline-none focus:ring-2 focus:ring-main-dark focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex gap-2 items-center"
          >
            <FaRegUser />
            {isLoading ? "Saving..." : user ? "Update User" : "Create User"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
