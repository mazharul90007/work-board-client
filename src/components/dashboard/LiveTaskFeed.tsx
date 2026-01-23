import { Task } from "@/src/interfaces/task.interface";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

const LiveTaskFeed = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div className="lg:col-span-4 bg-white dark:bg-white/3 p-6 rounded-3xl border border-slate-100 dark:border-slate-600  shadow-sm dark:shadow-slate-500 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-black text-slate-800 dark:text-dark-primary">
          Live Feed
        </h2>
        <div className="w-2 h-2 bg-emerald-600 rounded-full animate-ping" />
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto max-h-100 pr-2 scrollbar-hide">
        {tasks.slice(0, 5).map((task) => (
          <div
            key={task.id}
            className="flex gap-4 group cursor-pointer bg-white dark:bg-white/3 border-2 border-slate-100 dark:border-white/5 hover:border-purple-500/50 shadow rounded-xl px-2 py-3"
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 flex items-center justify-center text-xs font-black text-purple-600 dark:text-purple-400 transition-all duration-300">
                {task.assignedTo?.name?.charAt(0) || "U"}
              </div>
              {/* <div className="w-0.5 h-full bg-slate-50 group-last:hidden" /> */}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="text-sm font-bold text-slate-800 dark:text-zinc-100 group-hover:text-purple-600 transition-colors line-clamp-1">
                  {task.title}
                </p>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold mt-1 uppercase tracking-tight">
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
        className="w-full flex items-center justify-center mt-8 py-4 bg-purple-500 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all uppercase tracking-widest shadow-lg dark:shadow shadow-slate-200 cursor-pointer"
      >
        View All Tasks
      </Link>
    </div>
  );
};

export default LiveTaskFeed;
