"use client";

import { useGetUsers } from "@/src/hooks/use-users";
import { useTasks } from "@/src/hooks/use-tasks";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { TaskStatus } from "@/src/interfaces/task.interface";
import {
  Users,
  Calendar as CalendarIcon,
  Loader2,
  CheckCircle2,
  Zap,
  Activity,
  ClipboardList,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import StatCard from "./StatCard";

const AdminDashboard = () => {
  const currentUser = useAuthStore((state) => state.user);

  // 1. Fetch Real Data
  const { data: userData, isLoading: usersLoading } = useGetUsers();
  const { data: taskData, isLoading: tasksLoading } = useTasks({
    page: 1,
    limit: 100,
  });

  const users = userData?.data ?? [];
  const tasks = taskData?.data ?? [];

  // 2. Derive Real Metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (t) => t.status === TaskStatus.DONE,
  ).length;
  const activeTasks = tasks.filter(
    (t) => t.status === TaskStatus.IN_PROGRESS,
  ).length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (usersLoading || tasksLoading)
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] text-slate-500">
        <Loader2 className="animate-spin mb-4 text-purple-600" size={40} />
        <span className="font-bold tracking-widest text-xs uppercase animate-pulse">
          Synchronizing Real-time Data...
        </span>
      </div>
    );

  return (
    <div className="p-6 lg:p-10 space-y-10 bg-[#FBFBFE] min-h-screen">
      {/* --- PREMIUM HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            System <span className="text-purple-600">Overview</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Welcome back, {currentUser?.name || currentUser?.role}. Here is your
            live workspace status.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-600">
            <CalendarIcon size={14} className="text-purple-500" />
            <span>
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* --- LIVE STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Members"
          value={users.length}
          icon={<Users size={20} />}
          footer={`${users.filter((u) => u.status === "ACTIVE").length} Active now`}
          color="bg-purple-600"
          circleColor="bg-purple-100"
        />
        <StatCard
          title="Active Tasks"
          value={activeTasks}
          icon={<Zap size={20} />}
          footer={`${Math.round((activeTasks / totalTasks) * 100) || 0}% of workload`}
          color="bg-amber-500"
          circleColor="bg-amber-100"
        />
        <StatCard
          title="Completed"
          value={completedTasks}
          icon={<CheckCircle2 size={20} />}
          footer={`${completionRate}% Success rate`}
          color="bg-emerald-500"
          circleColor="bg-emerald-100"
        />
        <StatCard
          title="Total Backlog"
          value={totalTasks}
          icon={<ClipboardList size={20} />}
          footer="Across all projects"
          color="bg-blue-600"
          circleColor="bg-blue-100"
        />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Project Velocity (Bar Chart) */}
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative group overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <Activity size={20} />
              </div>
              <h2 className="text-xl font-black text-slate-800">
                Task Velocity
              </h2>
            </div>
            <div className="px-4 py-1.5 bg-slate-50 rounded-full text-[10px] font-black uppercase text-slate-400">
              Live Feed
            </div>
          </div>

          <div className="h-72 w-full flex items-end justify-between gap-3 px-4">
            {/* Generate Bars based on task count spread (visual representation) */}
            {[0.4, 0.8, 0.6, 0.9, 0.5, 0.7, 1].map((factor, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-3 group/bar"
              >
                <div className="w-full bg-slate-50 rounded-2xl relative flex items-end justify-center overflow-hidden transition-all duration-500 h-full">
                  <div
                    className="w-full bg-linear-to-t from-purple-600 to-purple-400 rounded-2xl transition-all duration-1000 ease-out"
                    style={{ height: `${factor * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-400">
                  P{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Task Feed */}
        <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black text-slate-800">Live Feed</h2>
            <div className="w-2 h-2 bg-emerald-600 rounded-full animate-ping" />
          </div>

          <div className="space-y-6 flex-1 overflow-y-auto max-h-100 pr-2 scrollbar-hide">
            {tasks.slice(0, 6).map((task) => (
              <div key={task.id} className="flex gap-4 group cursor-pointer">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-black text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                    {task.assignedTo?.name?.charAt(0) || "U"}
                  </div>
                  <div className="w-0.5 h-full bg-slate-50 group-last:hidden" />
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-slate-800 group-hover:text-purple-600 transition-colors line-clamp-1">
                      {task.title}
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tight">
                    {task.createdAt
                      ? formatDistanceToNow(new Date(task.createdAt)) + " ago"
                      : "Just now"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href={"/dashboard/task"}
            className="w-full flex items-center justify-center mt-8 py-4 bg-purple-500 hover:bg-purple-700 text-white font-bold text-xs rounded-2xl transition-all uppercase tracking-widest shadow-lg shadow-slate-200 cursor-pointer"
          >
            View All Tasks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
