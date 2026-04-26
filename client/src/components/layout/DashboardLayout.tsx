import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Shield,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const [user, setUser] = useState<{ role: string } | null>(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const navItems = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { name: "SOC Monitor", path: "/dashboard/soc", icon: <Shield size={20} /> },
    {
      name: "Service Requests",
      path: "/dashboard/requests",
      icon: <FileText size={20} />,
    },
    ...(user?.role === "sysadmin"
      ? [
          {
            name: "Admin Panel",
            path: "/dashboard/admin",
            icon: <Settings size={20} />,
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-20 h-screen bg-neutral-900 border-r border-white/5 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        } hidden md:flex flex-col`}
      >
        <div className="h-16 flex items-center justify-center border-b border-white/5">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tighter"
          >
            <Shield className="w-6 h-6 text-cyan-500" />
            {isSidebarOpen && <span className="text-white">Zer0-P0!nT</span>}
          </Link>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.icon}
                {isSidebarOpen && (
                  <span className="font-medium whitespace-nowrap">
                    {item.name}
                  </span>
                )}
                {!isSidebarOpen && (
                  <div className="absolute left-16 bg-neutral-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/5">
          <button className="flex items-center gap-3 px-3 py-3 rounded-lg text-rose-400 hover:bg-rose-500/10 w-full transition-colors">
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-neutral-900/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-neutral-400 hover:text-white hidden md:block"
            >
              <Menu size={20} />
            </button>
            <div className="text-sm font-medium text-neutral-400">
              Dashboard / <span className="text-white">Overview</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-neutral-400 hover:text-white relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500" />
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
