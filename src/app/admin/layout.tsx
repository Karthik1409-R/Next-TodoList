// app/admin/layout.tsx
import Link from "next/link";
import { LogOut, Users, ListTodo, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialogDemo } from "@/app/home/Alert";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-4 flex flex-col">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-8 flex justify-center">Admin Panel</h2>
          <nav className="space-y-2">
            <Link
              href="/admin/users"
              className="flex items-center space-x-2 hover:bg-gray-800 px-3 py-2 rounded-md transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>Users</span>
            </Link>
            <Link
              href="/admin/todos"
              className="flex items-center space-x-2 hover:bg-gray-800 px-3 py-2 rounded-md transition-colors"
            >
              <ListTodo className="w-5 h-5" />
              <span>Todos</span>
            </Link>
          </nav>
        </div>
        <div className="pt-4 border-t border-gray-700 flex items-center">
          <Button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm cursor-pointer flex justify-center items-center ml-16">
            <LogOut className="w-5 h-5" />
            <Link href="/">Logout</Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
