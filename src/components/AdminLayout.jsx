import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { SidebarProvider } from "./ui/sidebar";
import { Home, Package, Users, Settings, PlayCircle, IndianRupee } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation(); // ✅ get current route

  // function to check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col md:flex-row w-full bg-admin-bg">
        {/* Sidebar for desktop */}
        <div className="hidden md:block">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 bg-admin-surface border-b border-admin-border flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-semibold text-admin-text-primary">
                  ISTRIWALA Admin
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

          <div className="flex-1 overflow-auto p-6">{children}</div>
        </main>

        {/* ✅ Bottom Navigation for Mobile */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-admin-surface border-t border-admin-border flex justify-around py-2 shadow-lg">
          <Link
            to="/"
            className={`flex flex-col items-center text-sm ${
              isActive("/") ? "text-blue-600 font-semibold" : "text-admin-text-secondary"
            }`}
          >
            <Home className={`h-5 w-5 ${isActive("/") ? "stroke-blue-600" : ""}`} />
            <span>Home</span>
          </Link>

          <Link
            to="/orders"
            className={`flex flex-col items-center text-sm ${
              isActive("/orders") ? "text-blue-600 font-semibold" : "text-admin-text-secondary"
            }`}
          >
            <Package className={`h-5 w-5 ${isActive("/orders") ? "stroke-blue-600" : ""}`} />
            <span>Orders</span>
          </Link>

             <Link
            to="/payments"
            className={`flex flex-col items-center text-sm ${
              isActive("/payments") ? "text-blue-600 font-semibold" : "text-admin-text-secondary"
            }`}
          >
            <IndianRupee className={`h-5 w-5 ${isActive("/payments") ? "stroke-blue-600" : ""}`} />
            <span>Payments</span>
          </Link>

          <Link
            to="/users"
            className={`flex flex-col items-center text-sm ${
              isActive("/users") ? "text-blue-600 font-semibold" : "text-admin-text-secondary"
            }`}
          >
            <Users className={`h-5 w-5 ${isActive("/users") ? "stroke-blue-600" : ""}`} />
            <span>Users</span>
          </Link>

          <Link
            to="/profile"
            className={`flex flex-col items-center text-sm ${
              isActive("/profile") ? "text-blue-600 font-semibold" : "text-admin-text-secondary"
            }`}
          >
            <Settings className={`h-5 w-5 ${isActive("/profile") ? "stroke-blue-600" : ""}`} />
            <span>Settings</span>
          </Link>
        </nav>
      </div>
    </SidebarProvider>
  );
}
