"use client";
import { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  Ban,
  CheckCircle,
  Pencil,
  Trash2,
  MessageSquare,
  User as UserIcon,
} from "lucide-react";
import { User, UserStatus } from "../../interfaces/user.interface";
import Swal from "sweetalert2";
import { useDeleteUser, useUpdateUser } from "@/src/hooks/use-users";
import Image from "next/image";
import { useAuthStore } from "@/src/stores/useAuthStore";

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
}

const UserList = ({ users, onEdit }: UserListProps) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUser();
  const currentUser = useAuthStore((state) => state.user);

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
      title: "Update Status?",
      text: `Set ${user.name || user.email} to ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
    }).then((result) => {
      if (result.isConfirmed) {
        updateUser({ id: user.id, input: { status: newStatus } });
      }
    });
  };

  const handleDelete = (id: string, userName: string) => {
    setOpenMenuId(null);
    if (id === currentUser?.id) {
      Swal.fire({
        title: "Denied",
        text: "You cannot delete yourself.",
        icon: "error",
      });
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: `Delete ${userName}? This action is permanent.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
    }).then((result) => {
      if (result.isConfirmed) deleteUser(id);
    });
  };

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-card-main rounded-2xl border border-dashed border-slate-200 dark:border-slate-500">
        <div className="bg-slate-50 dark:bg-slate-300 p-4 rounded-full mb-4">
          <UserIcon className="w-8 h-8 text-slate-300 dark:text-slate-600" />
        </div>
        <p className="text-slate-600 dark:text-dark-secondary font-semibold text-lg">
          No users in sight
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {users?.map((user: User) => (
        <div
          key={user.id}
          className="bg-white dark:bg-card-main rounded-2xl border border-slate-200 dark:border-slate-600 shadow-sm p-6 relative group transition-all hover:shadow-md"
        >
          {/* Top Row: Avatar & Name */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-4">
              <div className="relative w-14 h-14 shrink-0">
                {user.profilePhoto ? (
                  <Image
                    src={user.profilePhoto}
                    alt={user.name || ""}
                    fill
                    className="rounded-2xl object-cover border border-slate-100 shadow-sm"
                  />
                ) : (
                  <div className="w-full h-full rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-700 dark:text-purple-400 font-bold text-xl">
                    {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                  {user.name || "Unnamed User"}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {user.role}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                      user.status === UserStatus.ACTIVE
                        ? "bg-green-50 text-green-600 border-green-100"
                        : "bg-red-50 text-red-600 border-red-100"
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Menu */}
            <div
              className="relative"
              ref={openMenuId === user.id ? menuRef : null}
            >
              <button
                onClick={() =>
                  setOpenMenuId(openMenuId === user.id ? null : user.id)
                }
                className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 rounded-xl transition-colors"
              >
                <MoreVertical size={20} />
              </button>

              {openMenuId === user.id && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 p-2 animate-in fade-in zoom-in duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Manage
                  </div>
                  <button
                    onClick={() => handleStatusUpdate(user, UserStatus.ACTIVE)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg cursor-pointer"
                  >
                    <CheckCircle size={14} className="text-green-500" />{" "}
                    Activate
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(user, UserStatus.BLOCKED)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg cursor-pointer"
                  >
                    <Ban size={14} className="text-red-500" /> Block
                  </button>
                  <div className="my-1 border-t border-slate-100 dark:border-white/5" />
                  <button
                    onClick={() => {
                      onEdit(user);
                      setOpenMenuId(null);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg cursor-pointer"
                  >
                    <Pencil size={14} /> Edit Profile
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(user.id, user.name || user.email)
                    }
                    disabled={user.id === currentUser?.id}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg disabled:opacity-30 cursor-pointer"
                  >
                    <Trash2 size={14} /> Delete User
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* User Details Section */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-slate-400">Email</span>
              <span className="font-bold text-slate-700 dark:text-zinc-300 truncate max-w-45">
                {user.email}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-slate-400">Member ID</span>
              <span className="font-mono text-xs bg-slate-50 dark:bg-white/5 px-2 py-1 rounded-md text-slate-600 dark:text-zinc-400">
                {user.memberId}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-slate-400">Joined</span>
              <span className="font-bold text-slate-600 dark:text-zinc-400">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Action Buttons (Footer) */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50 dark:border-white/5">
            <button
              onClick={() => onEdit(user)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer"
            >
              <UserIcon size={16} />
              Profile
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-500 dark:bg-purple-700 hover:bg-purple-600 text-sm font-bold text-white transition-all shadow-md shadow-purple-100 dark:shadow-none cursor-pointer">
              <MessageSquare size={16} />
              Message
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
