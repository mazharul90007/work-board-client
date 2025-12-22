import { TaskList } from "@/src/components/task-list";
import { Header } from "@/src/components/header";

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <TaskList />
      </main>
    </div>
  );
}
