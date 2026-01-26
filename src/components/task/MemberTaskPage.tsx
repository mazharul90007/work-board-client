"use client";

import { useMemo, useState } from "react";
import { useTasks } from "@/src/hooks/use-tasks";
import { TaskStatus, Priority, Task } from "@/src/interfaces/task.interface";
import Pagination from "@/src/components/pagination";
import TaskList from "@/src/components/task-list";
import TaskViewToggle from "@/src/components/taskViewToggle";
import { TaskFilters } from "@/src/components/taskFilters";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { Loader2, RefreshCcw } from "lucide-react";
import UpdateTaskModal from "@/src/components/task/UpdateTaskModal";

const MemberTaskPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [status, setStatus] = useState<TaskStatus | undefined>();
  const [priority, setPriority] = useState<Priority | undefined>();
  const [view, setView] = useState<"all" | "assignedToMe" | "createdByMe">(
    "all",
  );

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const user = useAuthStore((state) => state.user);

  const params = useMemo(() => {
    const baseParams = { page, limit, status, priority };
    if (!user?.email || view === "all") {
      return baseParams;
    }

    return {
      page,
      limit,
      status,
      priority,
      ...(view === "assignedToMe"
        ? { assignedTo: user?.email }
        : { assignedBy: user?.email }),
    };
  }, [page, limit, status, priority, view, user?.email]);

  const resetFilters = () => {
    setStatus(undefined);
    setPriority(undefined);
    setPage(1);
    setView("all");
  };

  const { data, isLoading, isError, error } = useTasks(params);
  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-background transition-colors duration-500">
        <div className="relative flex items-center justify-center">
          {/* Outer pulse effect */}
          <div className="absolute w-16 h-16 bg-purple-500/20 rounded-full animate-ping" />

          {/* Main Spinner */}
          <Loader2
            className="animate-spin text-purple-600 dark:text-purple-400 z-10"
            size={42}
          />
        </div>

        <span className="mt-6 font-black tracking-[0.2em] text-[10px] uppercase animate-pulse text-slate-500 dark:text-zinc-500">
          Synchronizing Real-time Data
        </span>
      </div>
    );

  if (isError)
    return <div>Error: {error instanceof Error ? error.message : "Error"}</div>;

  const tasks = data?.data ?? [];
  const meta = data?.meta;

  // Handler for editing: open the Update modal and set the selected task
  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsUpdateModalOpen(true);
  };
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Member <span className="text-purple-600">Workspaces</span>
        </h1>
        <p className="text-slate-500 dark:text-dark-secondary font-medium mt-1">
          Manage and track your teams progress.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-card-main p-4 mb-4 rounded-xl border border-gray-200 dark:border-slate-600 shadow-sm">
        <TaskViewToggle view={view} onChange={setView} />

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <TaskFilters
            status={status}
            priority={priority}
            onStatusChange={setStatus}
            onPriorityChange={setPriority}
          />
          <button
            onClick={resetFilters}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition cursor-pointer"
            title="Reset Filters"
          >
            <RefreshCcw size={22} />
          </button>
        </div>
      </div>

      {/* Task Content */}
      <TaskList tasks={tasks} onEdit={handleEdit} />

      {/* Pagination */}
      <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
        {meta && (
          <Pagination
            page={meta.page}
            totalPages={meta.totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
      <UpdateTaskModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
      />
    </div>
  );
};

export default MemberTaskPage;
