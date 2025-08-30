import { useEffect, useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { SidebarProvider } from "./ui/sidebar";
import { Home, Package, Users, Settings, PlayCircle, IndianRupee, LogOut, UserPlus, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tokenPresent, setTokenPresent] = useState("")
  const location = useLocation(); // ✅ get current route
  const navigate = useNavigate();

  // function to check if link is active
  const isActive = (path) => location.pathname === path;

  const [role, setRole] = useState("");
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setTokenPresent(token)



  }, []);




  const handleLogout = () => {
    localStorage.removeItem("token");
    // setIsLoggedIn(false);
    navigate("/");
    toast.success("✅ Logout successfull!");
  };


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
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <div className="flex gap-4">
                <img src="/logo.png" alt="logo" className="h-10 w-10 lg:hidden block" />
                <div>
                  <h1 className="text-xl font-semibold text-admin-text-primary">
                    ISTRIWALA
                  </h1>
                  <p className="text-sm text-admin-text-secondary lg:block hidden">
                    Manage your e-commerce operations
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side */}
            {tokenPresent && (
              <div className="flex items-center gap-4">
                {/* Desktop Buttons */}
                <div className="hidden md:flex gap-4">
                  {role === "employee" ? null : (
                    <Link to={"/addEmployee"}>
                      <button
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                      >
                        <UserPlus className="h-5 w-5" /> Add Employee
                      </button>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >
                    <LogOut className="h-5 w-5" /> Logout
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 rounded-md hover:bg-admin-border"
                  >
                    {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
              <div className="absolute top-16 right-6 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3 md:hidden z-50">
                <Link to={"/addEmployee"}>
                  <button
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >
                    <UserPlus className="h-5 w-5" /> Add Employee
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  <LogOut className="h-5 w-5" /> Logout
                </button>
              </div>
            )}
          </header>

          <div className="flex-1 overflow-auto p-6">{children}</div>
        </main>

        {/* ✅ Bottom Navigation for Mobile */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-admin-surface border-t border-admin-border flex justify-around py-2 shadow-lg">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center text-sm ${isActive("/dashboard") ? "text-blue-600 font-semibold" : "text-admin-text-secondary"
              }`}
          >
            <Home className={`h-5 w-5 ${isActive("/dashboard") ? "stroke-blue-600" : ""}`} />
            <span>Home</span>
          </Link>

          <Link
            to="/orders"
            className={`flex flex-col items-center text-sm ${isActive("/orders") ? "text-blue-600 font-semibold" : "text-admin-text-secondary"
              }`}
          >
            <Package className={`h-5 w-5 ${isActive("/orders") ? "stroke-blue-600" : ""}`} />
            <span>Orders</span>
          </Link>

          <Link
            to="/payments"
            className={`flex flex-col items-center text-sm ${isActive("/payments") ? "text-blue-600 font-semibold" : "text-admin-text-secondary"
              }`}
          >
            <IndianRupee className={`h-5 w-5 ${isActive("/payments") ? "stroke-blue-600" : ""}`} />
            <span>Payments</span>
          </Link>

          <Link
            to="/users"
            className={`flex flex-col items-center text-sm ${isActive("/users") ? "text-blue-600 font-semibold" : "text-admin-text-secondary"
              }`}
          >
            <Users className={`h-5 w-5 ${isActive("/users") ? "stroke-blue-600" : ""}`} />
            <span>Users</span>
          </Link>

          <Link
            to="/profile"
            className={`flex flex-col items-center text-sm ${isActive("/profile") ? "text-blue-600 font-semibold" : "text-admin-text-secondary"
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
