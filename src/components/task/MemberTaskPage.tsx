"use client";

import { useMemo, useState } from "react";
import { useTasks } from "@/src/hooks/use-tasks";
import { TaskStatus, Priority, Task } from "@/src/interfaces/task.interface";
import Pagination from "@/src/components/pagination";
import TaskList from "@/src/components/task-list";
import TaskViewToggle from "@/src/components/taskViewToggle";
import { TaskFilters } from "@/src/components/taskFilters";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { RefreshCcw } from "lucide-react";
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
  if (isLoading) return <div>Loading tasks...</div>;

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
    <div className="p-8 min-h-screen bg-[#F8FAFC] space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Member Workspaces
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and track your teams progress.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
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
      <div className="pt-4 border-t border-gray-100">
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
