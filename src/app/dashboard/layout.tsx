import DashboardNav from "@/src/components/dashboardNav";
import DashboardTopNav from "@/src/components/dashboardTopNav";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFB] dark:bg-background">
      {" "}
      <aside className="hidden md:block w-fit lg:w-64 shrink-0 border-r border-slate-200 dark:border-slate-600 sticky top-0 h-screen overflow-y-auto transition-all duration-300">
        <DashboardNav />
      </aside>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopNav />
        <div className="flex-1 p-4 md:p-8 min-h-screen bg-white/80 dark:bg-background">
          {children}
        </div>
      </div>
    </div>
  );
}
