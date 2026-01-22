"use client";

import { useTasks } from "@/src/hooks/use-tasks";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { TaskStatus } from "@/src/interfaces/task.interface";
import {
  Calendar as CalendarIcon,
  Loader2,
  CheckCircle2,
  Zap,
  Activity,
  ClipboardList,
  ListTodo,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import StatCard from "./StatCard";

const LeaderDashboard = () => {
  const currentUser = useAuthStore((state) => state.user);

  // 1. Fetch Tasks Data
  const { data: taskData, isLoading: tasksLoading } = useTasks({
    page: 1,
    limit: 100,
  });
  const tasks = taskData?.data ?? [];

  // 2. Derive Real Metrics
  const totalTasks = tasks.length;

  //Filter for Todo task
  const todoTasks = tasks.filter((t) => t.status === TaskStatus.TODO).length;

  //Filter for Done task
  const completedTasks = tasks.filter(
    (t) => t.status === TaskStatus.DONE,
  ).length;

  //Filter for InProgress Task
  const activeTasks = tasks.filter(
    (t) => t.status === TaskStatus.IN_PROGRESS,
  ).length;

  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (tasksLoading)
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] text-slate-500">
        <Loader2 className="animate-spin mb-4 text-purple-600" size={40} />
        <span className="font-bold tracking-widest text-xs uppercase animate-pulse">
          Synchronizing Real-time Data...
        </span>
      </div>
    );

  return (
    <div className="p-6 lg:p-10 space-y-6 bg-[#FBFBFE] min-h-screen">
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
          title="To Do"
          value={todoTasks}
          icon={<ListTodo size={20} />}
          footer="Waiting to start"
          color="bg-indigo-500"
          circleColor="bg-indigo-100"
        />
        <StatCard
          title="In Progress"
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* --- POLISHED WORKSPACE HEALTH SECTION --- */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden flex flex-col">
          {/* Decorative Background Glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-50" />

          {/* MAIN CONTENT ROW */}
          <div className="flex flex-col md:flex-row gap-12 items-center flex-1">
            {/* LEFT COLUMN: The Interactive Progress Ring */}
            <div className="relative flex flex-col items-center shrink-0">
              <div className="relative w-52 h-52 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="104"
                    cy="104"
                    r="90"
                    stroke="currentColor"
                    strokeWidth="14"
                    fill="transparent"
                    className="text-slate-50"
                  />
                  <defs>
                    <linearGradient
                      id="progressGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#9333ea" />
                      <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="104"
                    cy="104"
                    r="90"
                    stroke="url(#progressGradient)"
                    strokeWidth="14"
                    fill="transparent"
                    strokeDasharray={565.48}
                    strokeDashoffset={565.48 - (565.48 * completionRate) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(147,51,234,0.3)]"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-slate-900 tracking-tighter">
                    {completionRate}
                    <span className="text-2xl text-purple-600">%</span>
                  </span>
                  <div className="flex items-center gap-1.5 mt-1 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <CheckCircle2 size={12} className="text-emerald-600" />
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">
                      Health
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Priority Intelligence */}
            <div className="flex-1 w-full space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Priority Intelligence
                  </h2>
                  <p className="text-slate-400 text-sm font-medium">
                    Distribution across active workloads
                  </p>
                </div>
                <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl">
                  <Activity size={24} />
                </div>
              </div>

              <div className="grid gap-5">
                {[
                  {
                    label: "High Priority",
                    color: "bg-red-500",
                    text: "text-red-500",
                    count: tasks.filter((t) => t.priority === "HIGH").length,
                    icon: "🔥",
                  },
                  {
                    label: "Medium Priority",
                    color: "bg-amber-500",
                    text: "text-amber-500",
                    count: tasks.filter((t) => t.priority === "MEDIUM").length,
                    icon: "⚡",
                  },
                  {
                    label: "Low Priority",
                    color: "bg-emerald-500",
                    text: "text-emerald-500",
                    count: tasks.filter((t) => t.priority === "LOW").length,
                    icon: "🌱",
                  },
                ].map((p) => (
                  <div key={p.label} className="group/item">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{p.icon}</span>
                        <span
                          className={`text-xs font-black uppercase tracking-widest ${p.text}`}
                        >
                          {p.label}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-500">
                        {p.count} Tasks
                      </span>
                    </div>
                    <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                      <div
                        className={`h-full ${p.color} rounded-full transition-all duration-1000`}
                        style={{
                          width: `${totalTasks > 0 ? (p.count / totalTasks) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- NEW FOOTER METRICS: This fills the Y-axis gap --- */}
          <div className="mt-10 pt-8 border-t border-slate-50 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                Active Rate
              </span>
              <span className="text-lg font-black text-slate-800">
                {Math.round((activeTasks / totalTasks) * 100 || 0)}%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                Todo Count
              </span>
              <span className="text-lg font-black text-slate-800">
                {todoTasks}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                System Status
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-emerald-600">
                  Optimal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Task Feed */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black text-slate-800">Live Feed</h2>
            <div className="w-2 h-2 bg-emerald-600 rounded-full animate-ping" />
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-100 pr-2 scrollbar-hide">
            {tasks.slice(0, 5).map((task) => (
              <div
                key={task.id}
                className="flex gap-4 group cursor-pointer bg-purple-50 border-2 border-purple-100 shadow rounded-xl px-2 py-3"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-xs font-black text-purple-600 transition-all duration-300">
                    {task.assignedTo?.name?.charAt(0) || "U"}
                  </div>
                  {/* <div className="w-0.5 h-full bg-slate-50 group-last:hidden" /> */}
                </div>
                <div className="flex-1">
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
            className="w-full flex items-center justify-center mt-8 py-4 bg-purple-500 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all uppercase tracking-widest shadow-lg shadow-slate-200 cursor-pointer"
          >
            View All Tasks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeaderDashboard;
