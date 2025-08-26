import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { SidebarProvider } from "./ui/sidebar";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

export function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-admin-bg">
        <AdminSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 bg-admin-surface border-b border-admin-border flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-admin-text-primary">
                  Isthri Wala Admin
                </h1>
                <p className="text-sm text-admin-text-secondary">
                  Manage your e-commerce operations
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-gradient-primary"></div>
            </div>
          </header>
          <div className="flex-1 overflow-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}