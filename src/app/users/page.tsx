import { UserList } from "@/src/components/user-list";
import { Header } from "@/src/components/header";

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <UserList />
      </main>
    </div>
  );
}
