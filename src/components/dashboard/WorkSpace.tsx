import { Task, TaskStatus } from "@/src/interfaces/task.interface";
import { User } from "@/src/interfaces/user.interface";
import { Activity, CheckCircle2 } from "lucide-react";

interface WorkSpaceProps {
  tasks: Task[];
  users?: User[];
}

const WorkSpace = ({ tasks, users }: WorkSpaceProps) => {
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
  return (
    <div className="lg:col-span-8 bg-white dark:bg-card-main p-8 rounded-4xl border border-slate-100 dark:border-card-border-main shadow-sm dark:shadow-slate-500 relative overflow-hidden flex flex-col">
      {/* Decorative Background Glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64  dark:bg-purple-600/20 rounded-full blur-3xl" />

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
              <span className="text-5xl font-black text-slate-900 dark:text-dark-primary tracking-tighter">
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
              <h2 className="text-2xl font-black text-slate-900 dark:text-dark-primary tracking-tight">
                Priority Intelligence
              </h2>
              <p className="text-slate-400 dark:text-dark-secondary text-sm font-medium">
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

      {/* --- FOOTER METRICS --- */}
      <div className="mt-10 pt-8 border-t border-slate-50 dark:border-slate-500 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <span className="text-slate-400 dark:text-dark-secondary text-[10px] font-bold uppercase tracking-widest">
            Active Rate
          </span>
          <span className="text-lg font-black text-slate-800 dark:text-dark-primary">
            {Math.round((activeTasks / totalTasks) * 100 || 0)}%
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-400 dark:text-dark-secondary text-[10px] font-bold uppercase tracking-widest">
            Todo Count
          </span>
          <span className="text-lg font-black text-slate-800 dark:text-dark-primary">
            {todoTasks}
          </span>
        </div>
        {users && (
          <div className="flex flex-col">
            <span className="text-slate-400 dark:text-dark-secondary text-[10px] font-bold uppercase tracking-widest">
              Team Load
            </span>
            <span className="text-lg font-black text-slate-800 dark:text-dark-primary">
              {(totalTasks / (users.length || 1)).toFixed(1)}{" "}
              <span className="text-xs text-slate-400">t/u</span>
            </span>
          </div>
        )}

        <div className="flex flex-col">
          <span className="text-slate-400 dark:text-dark-secondary text-[10px] font-bold uppercase tracking-widest">
            System Status
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-emerald-600">Optimal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSpace;
