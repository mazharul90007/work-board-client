"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2"; // 1. Import SweetAlert2
import { Task, TaskStatus } from "../interfaces/task.interface";
import {
  Calendar,
  Clock,
  Pencil,
  Trash2,
  MoreHorizontal,
  CheckCircle2,
  RefreshCcw,
  ClipboardCheck,
} from "lucide-react";
import { useDeleteTask, useUpdateTask } from "../hooks/use-tasks";

export default function TaskList({
  tasks,
  onEdit,
}: {
  tasks: Task[];
  onEdit: (task: Task) => void;
}) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  // handle Delete function
  const handleDelete = (id: string) => {
    setOpenMenuId(null); // Close the dropdown menu immediately

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this task once deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-lg px-4 py-2 font-bold",
        cancelButton: "rounded-lg px-4 py-2 font-bold",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(id);
      }
    });
  };

  //handle Update status function
  const handleStatusUpdate = (task: Task, newStatus: TaskStatus) => {
    setOpenMenuId(null);

    const statusText =
      newStatus === TaskStatus.DONE
        ? "Mark as Done"
        : newStatus === TaskStatus.IN_PROGRESS
          ? "Set to In Progress"
          : "Set to TODO";
    Swal.fire({
      title: statusText,
      text: `Change status from ${task.status} to ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, update it!",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-lg px-4 py-2 font-bold",
        cancelButton: "rounded-lg px-4 py-2 font-bold",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        updateTask({
          id: task.id,
          input: {
            status: newStatus,
          },
        });
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-dashed border-slate-200">
        <div className="bg-slate-50 p-4 rounded-full mb-4">
          <Clock className="w-8 h-8 text-slate-300" />
        </div>
        <p className="text-slate-600 font-semibold text-lg">
          No tasks in sight
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* ================Indications==================== */}
      <div className="mb-2 flex gap-2 items-center">
        <p className="text-sm font-bold ">Priority: </p>
        <div className="flex items-center gap-1">
          <p className="text-xs">LOW</p>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-xs">MEDIUM</p>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-xs">HIGH</p>
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        </div>
      </div>

      {/* ==================Task Cards============ */}
      <div className="space-y-3">
        {tasks.map((task) => {
          const assignedByName = task.assignedBy?.name ?? "User";
          const assignedToName = task.assignedTo?.name ?? "Unassigned";
          const isOverdue =
            task.dueDate &&
            new Date(task.dueDate) < new Date() &&
            task.status !== "DONE";
          const formattedDate = task.dueDate
            ? new Date(task.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "No date";

          return (
            <div
              key={task.id}
              className="group flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-purple-200 hover:shadow-sm transition-all duration-200"
            >
              {/* --- LEFT SECTION: Title & Description --- */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                      task.priority === "HIGH"
                        ? "bg-red-500"
                        : task.priority === "MEDIUM"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  />

                  <h3
                    className={`font-bold text-slate-800 truncate text-sm md:text-base ${task.status === "DONE" ? "line-through text-slate-400" : ""}`}
                  >
                    {task.title}
                  </h3>
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-slate-500 line-clamp-1 truncate mt-0.5">
                    {task.description ?? "No description"}
                  </p>
                </div>
              </div>

              {/* ============= RIGHT SECTION: Metadata & Dropdown ============ */}
              <div className="flex items-center gap-4 md:gap-6">
                <div
                  className={`hidden lg:flex items-center gap-1.5 text-xs font-medium ${isOverdue ? "text-red-500" : "text-slate-400"}`}
                >
                  <Calendar size={14} />
                  <span>{formattedDate}</span>
                </div>

                <div className="hidden md:block">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      task.status === "DONE"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : task.status === "IN_PROGRESS"
                          ? "bg-blue-50 text-blue-600 border-blue-100"
                          : "bg-slate-50 text-slate-500 border-slate-100"
                    }`}
                  >
                    {task.status.replace("_", " ")}
                  </span>
                </div>

                <div className="flex items-center -space-x-2">
                  <div
                    title={`By: ${assignedByName}`}
                    className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden relative shadow-sm"
                  >
                    {task.assignedBy?.profilePhoto ? (
                      <Image
                        src={task.assignedBy.profilePhoto}
                        alt={assignedByName}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] bg-slate-200 text-slate-600 font-bold">
                        {assignedByName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div
                    title={`To: ${assignedToName}`}
                    className="w-8 h-8 rounded-full border-2 border-white bg-purple-100 overflow-hidden relative z-10 shadow-sm"
                  >
                    {task.assignedTo?.profilePhoto ? (
                      <Image
                        src={task.assignedTo.profilePhoto}
                        alt={assignedToName}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] bg-purple-200 text-purple-600 font-bold">
                        {assignedToName.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className="relative border-l border-slate-100 pl-4"
                  ref={openMenuId === task.id ? menuRef : null}
                >
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === task.id ? null : task.id)
                    }
                    className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {openMenuId === task.id && (
                    <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-100 overflow-hidden animate-in fade-in zoom-in duration-100 p-2">
                      <div className="">
                        <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 bg-purple-100 rounded">
                          Task Status
                        </div>
                        {/* status ToDo button */}
                        <button
                          onClick={() =>
                            handleStatusUpdate(task, TaskStatus.TODO)
                          }
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <ClipboardCheck size={16} className="text-gray-500" />
                          Mark as ToDo
                        </button>

                        {/* status In progress button */}
                        <button
                          onClick={() =>
                            handleStatusUpdate(task, TaskStatus.IN_PROGRESS)
                          }
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <RefreshCcw size={16} className="text-blue-500" />
                          In Progress
                        </button>

                        {/* status Done button */}
                        <button
                          onClick={() =>
                            handleStatusUpdate(task, TaskStatus.DONE)
                          }
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-emerald-500"
                          />
                          Mark as Done
                        </button>
                      </div>

                      <div className="mt-1">
                        <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 bg-purple-100 rounded">
                          Manage
                        </div>
                        <button
                          onClick={() => {
                            onEdit(task);
                            setOpenMenuId(null);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Pencil size={16} className="text-slate-400" />
                          Edit Details
                        </button>
                        <button
                          disabled={isDeleting}
                          onClick={() => handleDelete(task.id)}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <Trash2
                            size={16}
                            className={
                              isDeleting ? "animate-pulse" : "text-red-400"
                            }
                          />
                          {isDeleting ? "Deleting..." : "Delete Task"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
