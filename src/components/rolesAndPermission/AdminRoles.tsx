"use client";

import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  ShieldAlert,
  Settings2,
  UserCog,
  ClipboardCheck,
} from "lucide-react";

const AdminRolesPage = () => {
  const sections = [
    {
      category: "User Management",
      icon: <UserCog className="text-blue-600 dark:text-blue-400" size={24} />,
      points: [
        "Create and Onboard new organization members manually.",
        "View full profile details for any user in the system.",
        "Update user information, including roles and status.",
        "Soft-delete users with automatic task cleanup (Database Transactions).",
        "Reactivate previously deleted user accounts.",
      ],
    },
    {
      category: "Task Control",
      icon: (
        <ClipboardCheck
          className="text-purple-600 dark:text-purple-400"
          size={24}
        />
      ),
      points: [
        "Global visibility: Access every task across the entire platform.",
        "Bypass ownership: Edit or reassign tasks created by any user.",
        "Permanent Deletion: Remove high-priority tasks from the system.",
        "Bulk oversight: Filter and track tasks by any assignee or assigner.",
      ],
    },
    {
      category: "System Authority",
      icon: (
        <ShieldCheck
          className="text-emerald-600 dark:text-emerald-400"
          size={24}
        />
      ),
      points: [
        "Highest Clearance: Override restricted actions for Leaders and Members.",
        "Role Modification: Promote or demote users between hierarchy levels.",
        "Security Oversight: Manage system-wide data integrity.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white p-6 lg:p-12 font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 border-b border-slate-200 dark:border-white/5 pb-8">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-4">
            <ShieldAlert size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Administrative Access
            </span>
          </div>
          <h1 className="text-4xl font-black mb-4 tracking-tight">
            System Permissions
          </h1>
          <p className="text-slate-500 dark:text-zinc-500 text-lg font-medium">
            As an Administrator, you have unrestricted access to govern the
            Workboard workspace.
          </p>
        </div>

        {/* List Sections */}
        <div className="space-y-12">
          {sections.map((section, idx) => (
            <div key={idx} className="relative">
              {/* Category Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
                  {section.category}
                </h2>
              </div>

              {/* Points List */}
              <div className="grid gap-2 ml-2">
                {section.points.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white dark:hover:bg-white/2 transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/5 hover:shadow-sm dark:hover:shadow-none group"
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

        {/* Footer Banner */}
        <div className="mt-16 p-8 bg-purple-50 dark:bg-purple-600/5 border border-purple-100 dark:border-purple-500/20 rounded-4xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-600 rounded-2xl shadow-lg shadow-purple-200 dark:shadow-none">
              <Settings2 className="text-white" size={24} />
            </div>
            <div>
              <p className="font-bold text-lg text-slate-800 dark:text-white">
                Full Operational Control
              </p>
              <p className="text-slate-500 dark:text-zinc-500 text-sm font-medium">
                Permissions are synced with the live database ACL.
              </p>
            </div>
          </div>
          <div className="px-6 py-2 bg-slate-900 dark:bg-purple-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-md">
            Active Session
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRolesPage;
