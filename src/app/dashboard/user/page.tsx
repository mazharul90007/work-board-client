"use client";

import { useGetUsers } from "@/src/hooks/use-users";
import { User } from "@/src/interfaces/user.interface";
import { Loader2 } from "lucide-react";

const UserPage = () => {
  const { data: users, isLoading, isError } = useGetUsers();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin mr-2" size={24} />
        <span>Loading users...</span>
      </div>
    );

  if (isError)
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load users. Please try again.
      </div>
    );

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                #
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Role
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Member ID
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User, index: number) => (
              <tr
                key={user.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-3 px-6 text-sm text-gray-700">{index + 1}</td>
                <td className="py-3 px-6 text-sm text-gray-700 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700">
                    {user.name?.charAt(0) || user.email.charAt(0)}
                  </div>
                  <span>{user.name || "Unnamed User"}</span>
                </td>
                <td className="py-3 px-6 text-sm text-gray-700">
                  {user.email}
                </td>
                <td className="py-3 px-6 text-sm text-gray-700">{user.role}</td>
                <td className="py-3 px-6 text-sm text-gray-700">
                  {user.memberId}
                </td>
                <td className="py-3 px-6 text-sm text-gray-700">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPage;
