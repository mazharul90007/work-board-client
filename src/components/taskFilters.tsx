import { TaskStatus, Priority } from "../interfaces/task.interface";
import { ChevronDown, Filter } from "lucide-react";

interface TaskFiltersProps {
  status?: TaskStatus;
  priority?: Priority;
  onStatusChange: (status?: TaskStatus) => void;
  onPriorityChange: (priority?: Priority) => void;
}

export const TaskFilters = ({
  status,
  priority,
  onStatusChange,
  onPriorityChange,
}: TaskFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-3">
      {/* ================== Status Filter ===================== */}
      <div className="relative group min-w-35">
        <div
          className={`flex items-center gap-2 px-4 py-2 bg-white dark:bg-card-main border ${
            status
              ? "border-blue-500 ring-1 ring-blue-100 dark:ring-blue-900/30"
              : "border-purple-100 dark:border-slate-500"
          } rounded-full group-hover:bg-gray-50 dark:group-hover:bg-white/5 transition-all shadow-sm`}
        >
          <div
            className={`w-2 h-2 rounded-full shrink-0 ${
              status === TaskStatus.DONE
                ? "bg-green-500"
                : status === TaskStatus.IN_PROGRESS
                  ? "bg-yellow-500"
                  : status === TaskStatus.TODO
                    ? "bg-gray-400 dark:bg-zinc-500"
                    : "bg-blue-500"
            }`}
          />
          <span className="text-sm font-bold text-slate-700 dark:text-zinc-300 whitespace-nowrap">
            {status ? `Status: ${status.replace("_", " ")}` : "Status: All"}
          </span>
          <ChevronDown
            size={14}
            className="ml-auto text-slate-400 dark:text-zinc-500"
          />
        </div>
        <select
          value={status ?? ""}
          onChange={(e) =>
            onStatusChange(
              e.target.value === ""
                ? undefined
                : (e.target.value as TaskStatus),
            )
          }
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        >
          <option value="" className="dark:bg-zinc-900">
            Status: All
          </option>
          <option value={TaskStatus.TODO} className="dark:bg-zinc-900">
            To Do
          </option>
          <option value={TaskStatus.IN_PROGRESS} className="dark:bg-zinc-900">
            In Progress
          </option>
          <option value={TaskStatus.DONE} className="dark:bg-zinc-900">
            Done
          </option>
        </select>
      </div>

      {/* =============== Priority Filter =============== */}
      <div className="relative group min-w-35">
        {/* Visual Layer */}
        <div
          className={`flex items-center gap-2 px-4 py-2 bg-white dark:bg-card-main border ${
            priority
              ? "border-orange-500 ring-1 ring-orange-100 dark:ring-orange-900/30"
              : "border-purple-100 dark:border-slate-500"
          } rounded-full group-hover:bg-gray-50 dark:group-hover:bg-white/5 transition-all shadow-sm`}
        >
          <Filter
            size={14}
            className={
              priority ? "text-orange-500" : "text-slate-400 dark:text-zinc-500"
            }
          />
          <span className="text-sm font-bold text-slate-700 dark:text-zinc-300 whitespace-nowrap">
            {priority ? `Priority: ${priority}` : "Priority: All"}
          </span>
          <ChevronDown
            size={14}
            className="ml-auto text-slate-400 dark:text-zinc-500"
          />
        </div>

        {/* Interaction Layer */}
        <select
          value={priority ?? ""}
          onChange={(e) =>
            onPriorityChange(
              e.target.value === "" ? undefined : (e.target.value as Priority),
            )
          }
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        >
          <option value="" className="dark:bg-zinc-900">
            Priority: All
          </option>
          <option value={Priority.LOW} className="dark:bg-zinc-900">
            Low
          </option>
          <option value={Priority.MEDIUM} className="dark:bg-zinc-900">
            Medium
          </option>
          <option value={Priority.HIGH} className="dark:bg-zinc-900">
            High
          </option>
        </select>
      </div>
    </div>
  );
};
