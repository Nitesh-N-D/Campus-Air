import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Calendar,
  LayoutDashboard,
  Megaphone,
  ShieldAlert,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

function Sidebar({ user, isMobile = false, onNavigate }) {
  const location = useLocation();

  const nav = [
    { name: "Overview", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Events", icon: Calendar, path: "/events" },
    { name: "Announcements", icon: Megaphone, path: "/announcements" },
    { name: "Calendar", icon: Calendar, path: "/calendar" },
    { name: "Students", icon: Users, path: "/students", adminOnly: true },
    { name: "Analytics", icon: BarChart3, path: "/analytics", adminOnly: true },
    { name: "Alerts", icon: ShieldAlert, path: "/create-alert", adminOnly: true },
  ];

  const filteredNav = nav.filter((item) => !item.adminOnly || user?.role === "admin");

  return (
    <aside
      className={`${isMobile ? "flex h-full w-full flex-col" : "sticky top-4 hidden h-[calc(100vh-2rem)] w-72 shrink-0 flex-col lg:flex"} rounded-[28px] border border-slate-200/80 bg-[linear-gradient(180deg,_rgba(9,14,23,0.98),_rgba(17,39,48,0.98))] p-5 text-slate-50 shadow-[0_24px_60px_rgba(15,23,42,0.24)]`}
    >
      <div className="flex-1">
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xl font-semibold tracking-tight">Campus Air</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {user?.role === "admin"
                  ? "Admin controls for events, alerts, announcements, and campus operations."
                  : "Student view for campus updates, announcements, and events."}
              </p>
            </div>

            <Badge
              variant="secondary"
              className="border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-100"
            >
              {user?.role === "admin" ? "Admin" : "Viewer"}
            </Badge>
          </div>
        </div>

        <nav className="mt-6 space-y-2">
          {filteredNav.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/dashboard" && location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onNavigate}
                className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-slate-900 shadow-[0_16px_30px_rgba(255,255,255,0.12)]"
                    : "text-slate-300 hover:bg-white/8 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`rounded-xl p-2 ${
                      isActive ? "bg-slate-100 text-teal-700" : "bg-white/6 text-slate-200"
                    }`}
                  >
                    <Icon size={16} />
                  </span>
                  {item.name}
                </span>

                {item.adminOnly && user?.role === "admin" && (
                  <Badge variant="outline" className="border-slate-200/20 text-[10px] text-inherit">
                    Admin
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
