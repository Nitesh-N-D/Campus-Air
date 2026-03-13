import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import API from "../services/api";
import socket from "../services/socket";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    API.get("/notifications").then((res) => {
      if (isMounted) {
        setNotifications(res.data);
      }
    });

    socket.on("newNotification", () => {
      API.get("/notifications").then((res) => {
        if (isMounted) {
          setNotifications(res.data);
        }
      });
    });

    return () => {
      isMounted = false;
      socket.off("newNotification");
    };
  }, []);

  const unread = notifications.filter((notification) => !notification.isRead).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-2xl border border-slate-200/70 bg-white px-3 py-2 text-slate-700 shadow-sm transition hover:border-teal-200 hover:text-teal-700"
      >
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-amber-400 px-1.5 py-0.5 text-[10px] font-bold text-slate-900">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-80 overflow-hidden rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-[0_22px_50px_rgba(15,23,42,0.14)] backdrop-blur">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">Notifications</p>
            <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
              {notifications.length} total
            </span>
          </div>

          {notifications.length === 0 && (
            <p className="rounded-2xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
              No notifications yet.
            </p>
          )}

          {notifications.map((notification, index) => (
            <div key={index} className="border-b border-slate-100 py-3 last:border-b-0">
              <p className="font-semibold text-slate-900">{notification.title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-500">{notification.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
