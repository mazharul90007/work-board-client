"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  X,
  UserCog,
  Mail,
  User,
  Phone,
  Lock,
  Loader2,
  ShieldCheck,
  Activity,
  AlertCircle,
} from "lucide-react";
import {
  User as IUser,
  UserRole,
  UserStatus,
  UpdateUserInput,
} from "@/src/interfaces/user.interface";
import { useUpdateUser } from "@/src/hooks/use-users";
import { useAuthStore } from "@/src/stores/useAuthStore";

export default function UpdateUserModal({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: IUser | null;
}) {
  const { mutate: updateUser, isPending } = useUpdateUser();
  const currentUser = useAuthStore((state) => state.user);

  //verify if the user is editing themselves
  const isEditingSelf = currentUser?.id === user?.id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserInput>();

  useEffect(() => {
    if (isOpen && user) {
      reset({
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        role: user.role ?? UserRole.MEMBER,
        status: (user.status as UserStatus) ?? UserStatus.ACTIVE,
        password: "", // Always reset password field to empty
      });
    }
  }, [user, isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = (data: UpdateUserInput) => {
    if (!user?.id) return;

    // Create a clean payload: remove empty password so bcrypt doesn't hash an empty string
    const input: UpdateUserInput = { ...data };
    if (!input.password) delete input.password;

    updateUser({ id: user.id, input }, { onSuccess: () => onClose() });
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-100 rounded-xl text-purple-600 shadow-sm">
              <UserCog size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Update User</h2>
              <p className="text-xs text-slate-500 font-medium">
                Modify account details and permissions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all cursor-pointer border border-transparent hover:border-slate-200"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  {...register("name")}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                  placeholder="Enter name"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  {...register("phone")}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                  placeholder="Phone number"
                />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1 flex items-center gap-1">
                <ShieldCheck size={12} /> Role
              </label>
              <select
                {...register("role")}
                disabled={isEditingSelf}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none cursor-pointer"
              >
                <option value={UserRole.ADMIN}>Admin</option>
                <option value={UserRole.LEADER}>Leader</option>
                <option value={UserRole.MEMBER}>Member</option>
              </select>
              {isEditingSelf && (
                <p className="text-[11px] text-amber-600 flex items-center gap-1 ml-1">
                  <AlertCircle size={10} /> You can not update your own role
                </p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1 flex items-center gap-1">
                <Activity size={12} /> Account Status
              </label>
              <select
                {...register("status")}
                disabled={isEditingSelf}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none cursor-pointer"
              >
                <option value={UserStatus.ACTIVE}>Active</option>
                <option value={UserStatus.DELETED}>Delete</option>
                <option value={UserStatus.BLOCKED}>Blocked</option>
              </select>
              {isEditingSelf && (
                <p className="text-[11px] text-amber-600 flex items-center gap-1 ml-1">
                  <AlertCircle size={10} /> You can not update your own status
                </p>
              )}
            </div>
          </div>

          {/* Email (Usually disabled or handled carefully) */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                size={16}
              />
              <input
                {...register("email")}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 outline-none"
                placeholder="email@company.com"
              />
            </div>
          </div>

          {/* Password Section */}
          <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-amber-700">
              <Lock size={14} className="font-bold" />
              <span className="text-xs font-bold uppercase tracking-tight">
                Security Update
              </span>
            </div>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter new password to reset"
              className="w-full px-4 py-2 bg-white border border-purple-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-purple-400 outline-none transition-all"
            />
            <p className="text-[12px] text-amber-600 italic">
              Leave this field blank to keep the current password.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-2 px-4 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 disabled:opacity-70 flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
