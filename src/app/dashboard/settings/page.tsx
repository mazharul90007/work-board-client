"use client";

import { useGetUser, useUploadProfileImage } from "@/src/hooks/use-users";
import { useAuthStore } from "@/src/stores/useAuthStore";
import {
  Mail,
  Hash,
  Calendar,
  Camera,
  Settings2,
  CheckCircle2,
  Loader2,
  Briefcase,
  Clock,
  CheckCircle,
  ListTodo,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { UserTask } from "@/src/interfaces/user.interface";
import Image from "next/image";
import { useState } from "react";
import UpdateUserModal from "@/src/components/user/UpdateUserModal";

// Interface for Sub-components
interface InfoItemProps {
  label: string;
  value: string | number | undefined;
  icon: React.ReactNode;
  isStatus?: boolean;
}

interface StatCardProps {
  label: string;
  count: number;
  icon: React.ReactNode;
}

const SettingsPage = () => {
  const authUser = useAuthStore((state) => state.user);
  const { data: profile, isLoading } = useGetUser(authUser?.id ?? null);
  const { mutate: uploadImage, isPending: isUploading } =
    useUploadProfileImage();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && profile?.id) {
      uploadImage({ id: profile.id, file });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin mb-4" />
        <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">
          Syncing Profile...
        </p>
      </div>
    );
  }

  // Task Statistics using UserTask interface
  const stats = {
    total: profile?.tasks?.length || 0,
    inProgress:
      profile?.tasks?.filter((t: UserTask) => t?.status === "IN_PROGRESS")
        .length || 0,
    done:
      profile?.tasks?.filter((t: UserTask) => t?.status === "DONE").length || 0,
    todo:
      profile?.tasks?.filter((t: UserTask) => t?.status === "TODO").length || 0,
  };

  return (
    <div className="max-w-6xl mx-auto transition-colors duration-300">
      {/* ========Open Update User Modal======== */}
      <UpdateUserModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        user={profile || null}
      />
      {/* 1. Profile Header Card */}
      <div className="relative mb-8 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-card-border-main rounded-2xl overflow-hidden shadow-sm">
        <div className="h-24 md:h-44 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600" />
        <div className="px-4 md:px-8 pb-6 md:pb-12">
          <div className="relative flex items-end gap-6 -mt-10 md:-mt-10">
            {/* =======Profile Image with Upload======= */}
            <div className="relative group">
              <div className="w-24 md:w-32 h-24 md:h-32 rounded-4xl bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-[#020617] shadow-2xl overflow-hidden flex items-center justify-center">
                {isUploading && (
                  <div className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
                {profile?.profilePhoto ? (
                  <Image
                    src={profile.profilePhoto}
                    alt="Profile Picture"
                    fill
                    className="object-cover rounded-lg"
                    sizes="128px"
                    priority
                  />
                ) : (
                  <span className="text-4xl font-black text-purple-600">
                    {profile?.name?.charAt(0)}
                  </span>
                )}
              </div>

              {/* Camera button */}
              <label className="absolute bottom-2 right-2 p-2 bg-purple-600 text-white rounded-xl shadow-lg hover:scale-110 transition-transform cursor-pointer z-30">
                <Camera size={16} />
                <input
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
              </label>
            </div>

            {/* =====Profile Details======= */}
            <div className="flex-1 pb-2 space-y-2">
              <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white">
                {profile?.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-widest">
                  {profile?.role}
                </span>
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400 text-xs font-bold">
                  <Mail size={14} /> {profile?.email}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="mb-2 flex items-center gap-2 px-3 md:px-6 py-1.5 md:py-3 bg-purple-600 text-white rounded-lg md:rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-700 transition-all cursor-pointer"
            >
              <Settings2 size={14} />{" "}
              <span className="hidden md:block">Update Profile</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* =============== Left Column: Personal Data =============== */}
        <div className="lg:col-span-7 space-y-6">
          {/* Detailed Information */}
          <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-card-border-main rounded-2xl p-8 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500 mb-8">
              Detailed Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem
                label="Member ID"
                value={`#${profile?.memberId}`}
                icon={<Hash size={14} />}
              />
              <InfoItem
                label="Phone Number"
                value={profile?.phone || "Not Provided"}
                icon={<Settings2 size={14} />}
              />
              <InfoItem
                label="Account Status"
                value={profile?.status}
                icon={<CheckCircle2 size={14} />}
                isStatus
              />
              <InfoItem
                label="Joined On"
                value={
                  profile?.createdAt
                    ? format(new Date(profile.createdAt), "MMMM dd, yyyy")
                    : "N/A"
                }
                icon={<Calendar size={14} />}
              />
            </div>
          </div>

          {/*  My Tasks Section */}
          <div className="bg-white dark:bg-card-main border border-slate-200 dark:border-card-border-main rounded-2xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500">
                My Tasks
              </h3>
              <Briefcase size={18} className="text-purple-500" />
            </div>

            <div className="space-y-4">
              {profile?.tasks?.slice(0, 3).map((task: UserTask) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-card-secondary rounded-2xl border border-slate-100 dark:border-card-border-main"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-zinc-100">
                      {task.title}
                    </p>
                    <p className="text-[10px] font-bold text-purple-500 uppercase tracking-tighter mt-1">
                      {task.priority} Priority
                    </p>
                  </div>
                  <span
                    className={`text-[9px] font-black px-3 py-1 rounded-lg uppercase ${
                      task.status === "DONE"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : task.status === "IN_PROGRESS"
                          ? "bg-blue-500/10 text-blue-500"
                          : "bg-slate-500/10 text-slate-500"
                    }`}
                  >
                    {(task.status || "TODO").replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================== Right Column: WorkLoad Summary ============ */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-card-main p-8 rounded-2xl border border-slate-200 dark:border-card-border-main shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-60 mb-8">
              Workload Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                label="Total"
                count={stats.total}
                icon={<ListTodo size={20} />}
              />
              <StatCard
                label="Doing"
                count={stats.inProgress}
                icon={<Clock size={20} />}
              />
              <StatCard
                label="Done"
                count={stats.done}
                icon={<CheckCircle size={20} />}
              />
              <StatCard
                label="Pending"
                count={stats.todo}
                icon={<AlertCircle size={20} />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- UI Sub-Components --- */

const InfoItem = ({ label, value, icon, isStatus }: InfoItemProps) => (
  <div className="space-y-2">
    <p className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-2">
      {icon} {label}
    </p>
    <p
      className={`text-sm font-bold ${isStatus ? "text-emerald-500" : "text-slate-700 dark:text-zinc-200"}`}
    >
      {value}
    </p>
  </div>
);

const StatCard = ({ label, count, icon }: StatCardProps) => (
  <div className="bg-slate-50 dark:bg-card-secondary backdrop-blur-md p-4 rounded-2xl border border-slate-100 dark:border-card-border-main shadow-sm">
    <div className="mb-2 opacity-80">{icon}</div>
    <p className="text-2xl font-black">{count}</p>
    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
      {label}
    </p>
  </div>
);

export default SettingsPage;
