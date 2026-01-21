"use client";
import { useState, useRef, useEffect } from "react";
import {
  Mail,
  MoreVertical,
  ShieldCheck,
  Ban,
  CheckCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import { User, UserStatus } from "../../interfaces/user.interface";
import Swal from "sweetalert2";
import { useUpdateUser } from "@/src/hooks/use-users";
import Image from "next/image";

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
}

const UserList = ({ users, onEdit }: UserListProps) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { mutate: updateUser } = useUpdateUser();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusUpdate = (user: User, newStatus: UserStatus) => {
    setOpenMenuId(null);
    Swal.fire({
      title: "Update User Status?",
      text: `Are you sure you want to set ${user.name || user.email} to ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateUser({
          id: user.id,
          input: { status: newStatus },
        });
      }
    });
  };

  const handleDelete = (id: string) => {
    setOpenMenuId(null);
    Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your delete mutation here
        console.log("Deleting user:", id);
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <table className="min-w-full divide-y divide-slate-100">
        <thead className="bg-slate-50/50">
          <tr className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
            <th className="py-4 px-6 text-left">Name & Email</th>
            <th className="py-4 px-6 text-left">Role</th>
            <th className="py-4 px-6 text-left">Member ID</th>
            <th className="py-4 px-6 text-left">Joined Date</th>
            <th className="py-4 px-6 text-left">Status</th>
            <th className="py-4 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {users?.map((user: User, index: number) => (
            <tr
              key={user.id}
              className="hover:bg-slate-50/50 transition-colors group"
            >
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  {/* Avatar / Profile Photo Logic */}
                  <div className="relative w-10 h-10 shrink-0">
                    {user.profilePhoto ? (
                      <Image
                        src={user.profilePhoto}
                        alt={user.name || "User Avatar"}
                        fill
                        className="rounded-full object-cover border border-slate-100 shadow-inner"
                        sizes="40px"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm shadow-inner">
                        {user.name?.charAt(0) ||
                          user.email.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="text-sm font-bold text-slate-800">
                      {user.name || "Unnamed User"}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <Mail size={12} /> {user.email}
                    </div>
                  </div>
                </div>
              </td>

              <td className="py-4 px-6">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-tight ${
                    user.role === "ADMIN"
                      ? "bg-amber-50 text-amber-600 border border-amber-100"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {user.role === "ADMIN" && <ShieldCheck size={12} />}
                  {user.role}
                </span>
              </td>

              <td className="py-4 px-6 text-sm text-slate-600 font-mono">
                {user.memberId}
              </td>

              <td className="py-4 px-6 text-sm text-slate-500">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>

              <td className="py-4 px-6">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                    user.status === UserStatus.ACTIVE
                      ? "bg-green-50 text-green-600 border-green-100"
                      : user.status === UserStatus.BLOCKED
                        ? "bg-red-50 text-red-600 border-red-100"
                        : "bg-gray-50 text-gray-500 border-gray-100"
                  }`}
                >
                  {user.status}
                </span>
              </td>

              {/* ACTION DROPDOWN */}
              <td className="py-4 px-6 text-right">
                <div
                  className="relative inline-block text-left"
                  ref={openMenuId === user.id ? menuRef : null}
                >
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === user.id ? null : user.id)
                    }
                    className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openMenuId === user.id && (
                    <div
                      className={`absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 animate-in fade-in zoom-in duration-100 ${index === users.length - 1 && users.length > 3 ? "bottom-full mb-2" : "mt-2"}`}
                    >
                      <div className="mb-1">
                        <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-purple-100 rounded">
                          Change Status
                        </div>
                        <button
                          onClick={() =>
                            handleStatusUpdate(user, UserStatus.ACTIVE)
                          }
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <CheckCircle size={14} className="text-green-500" />
                          Activate User
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(user, UserStatus.BLOCKED)
                          }
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Ban size={14} className="text-red-500" />
                          Block User
                        </button>
                      </div>

                      <div className="mt-1 pt-1 border-t border-slate-100">
                        <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-purple-100 rounded">
                          Account
                        </div>
                        <button
                          onClick={() => {
                            onEdit(user);
                            setOpenMenuId(null);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Pencil size={14} className="text-slate-400" />
                          Edit Profile
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} className="text-red-400" />
                          Delete User
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
