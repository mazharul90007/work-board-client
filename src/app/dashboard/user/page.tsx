"use client";

import { useMemo, useState } from "react";
import { useGetUsers } from "@/src/hooks/use-users";
import {
  User,
  UserQueryParams,
  UserRole,
  UserStatus,
} from "@/src/interfaces/user.interface";
import { Loader2, Search, PlusCircle, RefreshCcw } from "lucide-react";
import UserViewToggle from "@/src/components/user/userViewToggle";
import UserFilter from "@/src/components/user/userFilters";
import { useAuthStore } from "@/src/stores/useAuthStore";
import UserList from "@/src/components/user/userList";
import Pagination from "@/src/components/pagination";
import CreateUserModal from "@/src/components/user/CreateUserModal";
import UpdateUserModal from "@/src/components/user/UpdateUserModal";

const UserPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState<UserStatus | undefined>();
  const [view, setView] = useState<"all" | "admins" | "leaders" | "members">(
    "all",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const currentUser = useAuthStore((state) => state.user);

  // Function to open update modal
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const params = useMemo((): UserQueryParams => {
    const baseParams: UserQueryParams = { page, limit, status };
    // Add search if it exists
    if (searchTerm) baseParams.searchTerm = searchTerm;

    if (view !== "all") {
      if (view === "admins") baseParams.role = UserRole.ADMIN;
      if (view === "leaders") baseParams.role = UserRole.LEADER;
      if (view === "members") baseParams.role = UserRole.MEMBER;
    }

    return baseParams;
  }, [page, limit, status, view, searchTerm]);

  const { data, isLoading, isError } = useGetUsers(params);

  const users = data?.data ?? [];
  const meta = data?.meta;

  const resetFilters = () => {
    setStatus(undefined);
    setPage(1);
    setView("all");
    setSearchTerm("");
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50/50">
        <Loader2 className="animate-spin text-purple-600" size={32} />
      </div>
    );

  if (isError)
    return (
      <div className="text-red-500 text-center mt-10 p-4 bg-red-50 rounded-xl mx-auto max-w-md border border-red-100">
        Failed to load users. Please refresh the page.
      </div>
    );

  return (
    <div className="p-8 min-h-screen bg-[#F8FAFC]">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Team Members
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and track your team members.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search members.."
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 w-64 transition-all"
            />
          </div>

          {/* Filter Button */}
          {/* <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={20} />
          </button> */}

          {/* Add Member Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-all gap-2 cursor-pointer"
          >
            <PlusCircle size={18} />
            Add Member
          </button>
        </div>
      </div>

      {/* --- TABS SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 mb-4 rounded-xl border border-gray-200 shadow-sm">
        <UserViewToggle view={view} onChange={setView} />

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <UserFilter status={status} onStatusChange={setStatus} />
          <button
            onClick={resetFilters}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition cursor-pointer"
            title="Reset Filters"
          >
            <RefreshCcw size={22} />
          </button>
        </div>
      </div>

      {/* =============== TABLE SECTION ============= */}

      {/* User List Cards */}
      <UserList users={users} onEdit={handleEditUser} />

      {/* Modal Component */}
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Update Modal Component */}
      <UpdateUserModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />

      {/* Pagination */}
      <div className="pt-4 border-t border-gray-100">
        {meta && (
          <Pagination
            page={meta.page}
            totalPages={meta.totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default UserPage;
