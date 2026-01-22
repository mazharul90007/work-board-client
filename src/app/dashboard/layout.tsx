import DashboardNav from "@/src/components/dashboardNav";
import DashboardTopNav from "@/src/components/dashboardTopNav";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFB]">
      {" "}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-600 hidden lg:block sticky top-0 h-screen">
        <DashboardNav />
      </aside>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopNav />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
