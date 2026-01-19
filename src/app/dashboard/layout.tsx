import DashboardNav from "@/src/components/dashboardNav";
import DashboardTopNav from "@/src/components/dashboardTopNav";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex min-h-screen bg-[#F8FAFB]">
      {" "}
      <aside className="w-64 border-r border-slate-200 bg-white hidden lg:block">
        <DashboardNav />
      </aside>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopNav />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </main>
  );
}
