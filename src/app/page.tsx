import { Dashboard } from "@/src/components/dashboard";
import { Header } from "@/src/components/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto pt-8 pb-16 px-4">
        <Dashboard />
      </main>
    </div>
  );
}
