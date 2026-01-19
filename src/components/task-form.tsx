// "use client";

// import { useForm } from "react-hook-form";
// import { useEffect } from "react";
// import { TaskStatus, Priority, type Task } from "@/src/lib/api-client";
// import { useUsers } from "@/src/hooks/use-users";
// import { MdOutlineTask } from "react-icons/md";

// interface TaskFormProps {
//   task?: Task;
//   onSubmit: (data: {
//     title: string;
//     description: string;
//     status: TaskStatus;
//     priority: Priority;
//     userId: string;
//   }) => void;
//   onCancel: () => void;
//   isLoading?: boolean;
// }

// interface TaskFormData {
//   title: string;
//   description: string;
//   status: TaskStatus;
//   priority: Priority;
//   userId: string;
// }

// export function TaskForm({
//   task,
//   onSubmit,
//   onCancel,
//   isLoading,
// }: TaskFormProps) {
//   const { data: users } = useUsers();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<TaskFormData>({
//     defaultValues: {
//       title: task?.title || "",
//       description: task?.description || "",
//       status: task?.status || TaskStatus.TODO,
//       priority: task?.priority || Priority.MEDIUM,
//       userId: task?.userId || "",
//     },
//   });

//   useEffect(() => {
//     if (task) {
//       reset({
//         title: task.title,
//         description: task.description || "",
//         status: task.status,
//         priority: task.priority,
//         userId: task.userId,
//       });
//     }
//   }, [task, reset]);

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
//       <div className="p-6 border-b border-gray-200">
//         <h2 className="text-xl font-semibold text-gray-900">
//           {task ? "Edit Task" : "Create New Task"}
//         </h2>
//       </div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="p-6 space-y-4">
//           <div className="space-y-2">
//             <label
//               htmlFor="title"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Title
//             </label>
//             <input
//               id="title"
//               type="text"
//               {...register("title", { required: "Title is required" })}
//               placeholder="Enter task title"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//             {errors.title && (
//               <p className="text-sm text-red-600">{errors.title.message}</p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <label
//               htmlFor="description"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               {...register("description")}
//               placeholder="Enter task description"
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="space-y-2">
//               <label
//                 htmlFor="status"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Status
//               </label>
//               <select
//                 id="status"
//                 {...register("status")}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value={TaskStatus.TODO}>To Do</option>
//                 <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
//                 <option value={TaskStatus.DONE}>Done</option>
//               </select>
//             </div>
//             <div className="space-y-2">
//               <label
//                 htmlFor="priority"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Priority
//               </label>
//               <select
//                 id="priority"
//                 {...register("priority")}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value={Priority.LOW}>Low</option>
//                 <option value={Priority.MEDIUM}>Medium</option>
//                 <option value={Priority.HIGH}>High</option>
//               </select>
//             </div>
//           </div>
//           {!task && (
//             <div className="space-y-2">
//               <label
//                 htmlFor="userId"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Assign to User
//               </label>
//               <select
//                 id="userId"
//                 {...register("userId", { required: "Please select a user" })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="">Select a user</option>
//                 {users?.map((user) => (
//                   <option key={user.id} value={user.id}>
//                     {user.name || user.email}
//                   </option>
//                 ))}
//               </select>
//               {errors.userId && (
//                 <p className="text-sm text-red-600">{errors.userId.message}</p>
//               )}
//             </div>
//           )}
//         </div>
//         <div className="p-6 pt-0 flex gap-2">
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="px-4 py-2 bg-main text-white rounded-md hover:bg-main-dark focus:outline-none focus:ring-2 focus:ring-main-dark focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex gap-2 items-center cursor-pointer"
//           >
//             <MdOutlineTask />
//             {isLoading ? "Saving..." : task ? "Update Task" : "Create Task"}
//           </button>
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-main-dark focus:ring-offset-2 cursor-pointer"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
