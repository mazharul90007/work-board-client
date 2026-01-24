"use client";

import {
  CheckCircle2,
  Users,
  Briefcase,
  PenTool,
  LockKeyhole,
} from "lucide-react";

const LeaderRolesPage = () => {
  const sections = [
    {
      category: "Team Management",
      icon: <Users className="text-blue-600 dark:text-blue-400" size={24} />,
      points: [
        "View profiles of team members within the organization.",
        "Collaborate with Admins on user onboarding and assignments.",
        "Access a filtered list of all active team members.",
      ],
    },
    {
      category: "Task Supervision",
      icon: (
        <PenTool className="text-purple-600 dark:text-purple-400" size={24} />
      ),
      points: [
        "Create and assign new tasks to yourself or team members.",
        "Full Ownership: Edit or delete any task that you personally created.",
        "Update the status of tasks you are currently supervising.",
        "Track progress of all tasks where you are the Assigner (assignedBy).",
      ],
    },
    {
      category: "Access Constraints",
      icon: (
        <LockKeyhole className="text-rose-600 dark:text-rose-400" size={24} />
      ),
      points: [
        "Restricted: Cannot create or delete user accounts.",
        "Ownership Lock: Cannot edit or delete tasks created by Admins or other Leaders.",
        "No Global View: Task list is filtered to only show tasks you are involved in.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white p-6 lg:p-12 font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 border-b border-slate-200 dark:border-white/5 pb-8">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-4">
            <Briefcase size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Leader Privileges
            </span>
          </div>
          <h1 className="text-4xl font-black mb-4 tracking-tight">
            Project Supervision
          </h1>
          <p className="text-slate-500 dark:text-zinc-500 text-lg font-medium">
            Leaders bridge the gap between administration and execution,
            managing the core workflow of Workboard.
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
                      className="mt-1 text-purple-500 dark:text-purple-400 shrink-0 group-hover:scale-110 transition-transform"
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

export default LeaderRolesPage;
