import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Battery, Cpu, Thermometer, Plug, MapPin, AlertTriangle,
  User, Bell, BarChart3, LayoutDashboard, Menu, X, Sun, Moon, Search, Zap
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const navItems = [
  { path: "/", label: "Overview", icon: LayoutDashboard },
  { path: "/battery", label: "Battery & Energy", icon: Battery },
  { path: "/motor", label: "Motor & Drivetrain", icon: Cpu },
  { path: "/thermal", label: "Thermal Management", icon: Thermometer },
  { path: "/charging", label: "Charging", icon: Plug },
  { path: "/gps", label: "GPS & Fleet", icon: MapPin },
  { path: "/diagnostics", label: "Diagnostics", icon: AlertTriangle },
  { path: "/driver", label: "Driver Analytics", icon: User },
  { path: "/alerts", label: "Alerts", icon: Bell },
  { path: "/analytics", label: "Analytics", icon: BarChart3 },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isDark, toggle } = useTheme();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredNav = navItems.filter((n) =>
    n.label.toLowerCase().includes(search.toLowerCase())
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-5 border-b border-border/50">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        {sidebarOpen && (
          <div className="flex flex-col">
            <span className="font-bold text-sm text-foreground">EV Observer</span>
            <span className="text-[10px] text-muted-foreground">Real-Time Dashboard</span>
          </div>
        )}
      </div>

      {sidebarOpen && (
        <div className="px-3 pt-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 pl-8 pr-3 rounded-lg bg-secondary/50 border border-border/50 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>
        </div>
      )}

      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {filteredNav.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group ${
                active
                  ? "bg-primary/10 text-primary font-medium neon-glow"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              }`}
            >
              <item.icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-primary" : "group-hover:text-foreground"}`} />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-3 border-t border-border/50">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/30">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {sidebarOpen && <span className="text-xs text-muted-foreground">System Online</span>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-border/50 bg-card/50 backdrop-blur-xl transition-all duration-300 ${
          sidebarOpen ? "w-56" : "w-16"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-56 bg-card border-r border-border/50">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-14 border-b border-border/50 bg-card/50 backdrop-blur-xl flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { if (window.innerWidth < 768) setMobileOpen(true); else setSidebarOpen(!sidebarOpen); }}
              className="p-1.5 rounded-lg hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors"
            >
              {sidebarOpen ? <Menu className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            <h1 className="text-sm font-semibold text-foreground">
              {navItems.find((n) => n.path === location.pathname)?.label || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-medium text-emerald-400">LIVE</span>
            </div>
            <button
              onClick={toggle}
              className="p-1.5 rounded-lg hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
