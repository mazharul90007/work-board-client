"use client";

import { useTasks } from "@/src/hooks/use-tasks";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { TaskStatus } from "@/src/interfaces/task.interface";
import {
  Calendar as CalendarIcon,
  Loader2,
  CheckCircle2,
  Zap,
  ClipboardList,
  ListTodo,
} from "lucide-react";

import StatCard from "./StatCard";
import LiveTaskFeed from "./LiveTaskFeed";
import WorkSpace from "./WorkSpace";

const MemberDashboard = () => {
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
    <div className="space-y-6 min-h-screen">
      {/* --- PREMIUM HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-dark-primary tracking-tight">
            System <span className="text-purple-600">Overview</span>
          </h1>
          <p className="text-slate-500 dark:text-dark-secondary font-medium mt-1">
            Welcome back, {currentUser?.name || currentUser?.role}. Here is your
            live workspace status.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-card-main p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-500">
          <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-dark-primary">
            <CalendarIcon
              size={14}
              className="text-purple-500 dark:text-purple-300"
            />
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
        <WorkSpace tasks={tasks} />

        {/* Live Task Feed */}
        <LiveTaskFeed tasks={tasks} />
      </div>
    </div>
  );
};

export default MemberDashboard;
