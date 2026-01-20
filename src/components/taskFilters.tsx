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
    <div className="flex flex-wrap items-center gap-3">
      {/* ==================Status Filter===================== */}
      <div className="relative group min-w-35">
        <div
          className={`flex items-center gap-2 px-4 py-2 bg-white border ${
            status
              ? "border-blue-500 ring-1 ring-blue-100"
              : "border-purple-100"
          } rounded-full group-hover:bg-gray-50 transition-all shadow-sm`}
        >
          <div
            className={`w-2 h-2 rounded-full shrink-0 ${
              status === TaskStatus.DONE
                ? "bg-green-500"
                : status === TaskStatus.IN_PROGRESS
                  ? "bg-yellow-500"
                  : status === TaskStatus.TODO
                    ? "bg-gray-400"
                    : "bg-blue-500"
            }`}
          />
          <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
            {status ? `Status: ${status.replace("_", " ")}` : "Status: All"}
          </span>
          <ChevronDown size={14} className="ml-auto text-gray-400" />
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
          <option value="">Status: All</option>
          <option value={TaskStatus.TODO}>To Do</option>
          <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
          <option value={TaskStatus.DONE}>Done</option>
        </select>
      </div>

      {/* ===============Priority Filter=============== */}
      <div className="relative group min-w-35">
        {/* Visual Layer */}
        <div
          className={`flex items-center gap-2 px-4 py-2 bg-white border ${
            priority
              ? "border-orange-500 ring-1 ring-orange-100"
              : "border-purple-100"
          } rounded-full group-hover:bg-gray-50 transition-all shadow-sm`}
        >
          <Filter
            size={14}
            className={priority ? "text-orange-500" : "text-gray-400"}
          />
          <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
            {priority ? `Priority: ${priority}` : "Priority: All"}
          </span>
          <ChevronDown size={14} className="ml-auto text-gray-400" />
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
          <option value="">Priority: All</option>
          <option value={Priority.LOW}>Low</option>
          <option value={Priority.MEDIUM}>Medium</option>
          <option value={Priority.HIGH}>High</option>
        </select>
      </div>
    </div>
  );
};
