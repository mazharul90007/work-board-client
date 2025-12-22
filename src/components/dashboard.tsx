"use client";

import { useTasks } from "@/src/hooks/use-tasks";
import { useUsers } from "@/src/hooks/use-users";
import {
  CheckCircle2,
  Clock,
  ListTodo,
  Users,
  AlertCircle,
} from "lucide-react";
import { TaskStatus, Priority } from "@/src/lib/api-client";
import Link from "next/link";
import { StatsCard } from "./stats-card";

const statusColors = {
  [TaskStatus.TODO]: "bg-slate-500 text-white",
  [TaskStatus.IN_PROGRESS]: "bg-blue-500 text-white",
  [TaskStatus.DONE]: "bg-green-500 text-white",
};

const priorityColors = {
  [Priority.LOW]: "bg-gray-100 text-gray-800 border-gray-300",
  [Priority.MEDIUM]: "bg-yellow-100 text-yellow-800 border-yellow-300",
  [Priority.HIGH]: "bg-red-100 text-red-800 border-red-300",
};

export function Dashboard() {
  const { data: tasks, isLoading: tasksLoading } = useTasks();
  const { data: users, isLoading: usersLoading } = useUsers();

  if (tasksLoading || usersLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const todoTasks =
    tasks?.filter((t) => t.status === TaskStatus.TODO).length || 0;
  const inProgressTasks =
    tasks?.filter((t) => t.status === TaskStatus.IN_PROGRESS).length || 0;
  const doneTasks =
    tasks?.filter((t) => t.status === TaskStatus.DONE).length || 0;
  const highPriorityTasks =
    tasks?.filter((t) => t.priority === Priority.HIGH).length || 0;

  const recentTasks = tasks?.slice(0, 5) || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your work board</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Tasks"
          value={tasks?.length || 0}
          icon={ListTodo}
        />
        <StatsCard
          title="To Do"
          value={todoTasks}
          icon={Clock}
          description="Pending tasks"
        />
        <StatsCard
          title="In Progress"
          value={inProgressTasks}
          icon={AlertCircle}
          description="Active tasks"
        />
        <StatsCard
          title="Completed"
          value={doneTasks}
          icon={CheckCircle2}
          description="Finished tasks"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg border-2 border-purple-300 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Tasks
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {recentTasks.length > 0 ? (
              <>
                {recentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1 flex-1">
                      <p className="font-semibold text-gray-900 leading-none">
                        {task.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        Assigned to: {task.user.name || task.user.email}
                      </p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          statusColors[task.status]
                        }`}
                      >
                        {task.status.replace("_", " ")}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium border ${
                          priorityColors[task.priority]
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
                <Link href="/tasks">
                  <button className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md bg-gray-200 hover:bg-gray-300 hover:scale-95 transition-transform duration-300 cursor-pointer">
                    View All Tasks
                  </button>
                </Link>
              </>
            ) : (
              <p className="text-sm text-gray-600">No tasks yet</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg border-2 border-purple-300 shadow-sm">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Team Overview
            </h2>
            <Users className="h-6 w-6 text-gray-600" />
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-md font-medium text-gray-700">
                  Total Users
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  {users?.length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-md font-medium text-gray-700">
                  High Priority Tasks
                </span>
                <span className="text-2xl font-bold text-red-600">
                  {highPriorityTasks}
                </span>
              </div>
            </div>
            {users && users.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <p className="text-md font-semibold text-gray-700">
                  Team Members
                </p>
                {users.slice(0, 5).map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-900">
                      {user.name || "No name"}
                    </span>
                    <span className="text-gray-600">{user.email}</span>
                  </div>
                ))}
              </div>
            )}
            <Link href="/users">
              <button className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md bg-gray-200 hover:bg-gray-300 hover:scale-95 transition-transform duration-300 cursor-pointer">
                View All Users
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
