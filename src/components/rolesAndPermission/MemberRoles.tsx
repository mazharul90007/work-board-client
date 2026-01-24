"use client";

import {
  CheckCircle2,
  User,
  ListTodo,
  ShieldX,
  UserCircle,
} from "lucide-react";

const MemberRolesPage = () => {
  const sections = [
    {
      category: "Personal Management",
      icon: (
        <UserCircle className="text-blue-600 dark:text-blue-400" size={24} />
      ),
      points: [
        "Update your personal profile information and contact details.",
        "Upload and manage your custom profile photo (Cloudinary sync).",
        "Securely update your account password at any time.",
      ],
    },
    {
      category: "Task Execution",
      icon: (
        <ListTodo
          className="text-emerald-600 dark:text-emerald-400"
          size={24}
        />
      ),
      points: [
        "View all tasks specifically assigned to you by Leaders or Admins.",
        "Update the status of your assigned tasks to keep the team informed.",
        "Personal Dashboard: Focused view of only your active responsibilities.",
      ],
    },
    {
      category: "System Limits",
      icon: <ShieldX className="text-zinc-500 dark:text-zinc-500" size={24} />,
      points: [
        "No Creation Rights: Members cannot create new tasks or user accounts.",
        "ReadOnly Users: Cannot browse the full list of organization users.",
        "Restricted Actions: Cannot delete tasks or modify other users' data.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white p-6 lg:p-12 font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 border-b border-slate-200 dark:border-white/5 pb-8">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-4">
            <User size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Member Access
            </span>
          </div>
          <h1 className="text-4xl font-black mb-4 tracking-tight">
            Focus & Execution
          </h1>
          <p className="text-slate-500 dark:text-zinc-500 text-lg font-medium">
            Members are the core drivers of project tasks, focusing on
            completing assignments and maintaining personal profiles.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section, idx) => (
            <div key={idx} className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
                  {section.category}
                </h2>
              </div>
              <div className="grid gap-2 ml-2">
                {section.points.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white dark:hover:bg-white/2 transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/5 group"
                  >
                    <CheckCircle2
                      className="mt-1 text-emerald-500 dark:text-emerald-400 shrink-0 group-hover:scale-110 transition-transform"
                      size={18}
                    />
                    <p className="text-slate-600 dark:text-zinc-400 font-medium leading-relaxed group-hover:text-slate-900 dark:group-hover:text-zinc-200 transition-colors">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberRolesPage;
