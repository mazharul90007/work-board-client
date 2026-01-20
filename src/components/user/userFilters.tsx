import { UserStatus } from "@/src/interfaces/user.interface";
import { ChevronDown } from "lucide-react";

interface TaskFiltersProps {
  status?: UserStatus;
  onStatusChange: (status?: UserStatus) => void;
}

export default function UserFilter({
  status,
  onStatusChange,
}: TaskFiltersProps) {
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
              status === UserStatus.ACTIVE
                ? "bg-green-500"
                : status === UserStatus.BLOCKED
                  ? "bg-yellow-500"
                  : status === UserStatus.DELETED
                    ? "bg-red-400"
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
                : (e.target.value as UserStatus),
            )
          }
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        >
          <option value="">Status: All</option>
          <option value={UserStatus.ACTIVE}>ACTIVE</option>
          <option value={UserStatus.BLOCKED}>BLOCKED</option>
          <option value={UserStatus.DELETED}>DELETED</option>
        </select>
      </div>
    </div>
  );
}
