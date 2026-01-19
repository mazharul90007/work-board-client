"use client";

import { useGetUsers } from "@/src/hooks/use-users";
import {
  Users,
  ArrowUpRight,
  MoreHorizontal,
  Calendar as CalendarIcon,
  Loader2,
} from "lucide-react";

const RECENT_TASKS = [
  {
    id: "1",
    title: "Fix Auth Interceptor",
    user: "Mazharul",
    status: "IN_PROGRESS",
    priority: "HIGH",
  },
  {
    id: "2",
    title: "Design Dashboard Layout",
    user: "John Doe",
    status: "DONE",
    priority: "MEDIUM",
  },
  {
    id: "3",
    title: "Setup NestJS CORS",
    user: "Alice",
    status: "TODO",
    priority: "HIGH",
  },
];

const AdminDashboard = () => {
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
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Team Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Overview of your workspace productivity.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 shadow-sm">
            <CalendarIcon size={16} />
            <span>Jan 14, 2026 - Jan 21, 2026</span>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-md shadow-green-600/20">
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* ================Total Users Card================ */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start">
            <div
              className={`text-blue-600 bg-blue-50 p-3 rounded-xl group-hover:scale-110 transition-transform`}
            >
              <Users size={24} />
            </div>
            <button className="text-slate-300 hover:text-slate-500">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="mt-5">
            <p className="text-slate-500 text-sm font-medium">Total Members</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">
              {users?.length ? users.length : 0}
            </h3>
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
              <ArrowUpRight size={14} className="text-green-500" />
              description
            </p>
          </div>
        </div>

        {/* ================My assigned Task Card================ */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start">
            <div
              className={`text-blue-600 bg-blue-50 p-3 rounded-xl group-hover:scale-110 transition-transform`}
            >
              <Users size={24} />
            </div>
            <button className="text-slate-300 hover:text-slate-500">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="mt-5">
            <p className="text-slate-500 text-sm font-medium">Total Members</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">
              {users?.length ? users.length : 0}
            </h3>
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
              <ArrowUpRight size={14} className="text-green-500" />
              description
            </p>
          </div>
        </div>
      </div>

      {/* Main Content: Tasks & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Task Breakdown (Placeholder for Charts) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">
              Project Analytics
            </h2>
            <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg px-2 py-1 outline-none">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>

          <div className="flex items-center justify-center h-64 border-2 border-dashed border-slate-100 rounded-2xl">
            {/* You can integrate Chart.js or Recharts here later */}
            <div className="text-center">
              <div className="w-32 h-32 rounded-full border-8 border-green-500 border-t-blue-500 border-l-amber-500 mx-auto flex items-center justify-center">
                <span className="text-xl font-bold">28</span>
              </div>
              <p className="text-slate-400 text-sm mt-4 font-medium">
                Task Distribution by Status
              </p>
            </div>
          </div>
        </div>

        {/* Recent Tasks List */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {RECENT_TASKS.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-2 h-10 rounded-full ${
                      task.priority === "HIGH" ? "bg-red-500" : "bg-blue-500"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-700 group-hover:text-green-600 transition-colors">
                      {task.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      Assigned to {task.user}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                    task.status === "DONE"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-bold text-slate-400 hover:text-green-600 transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
