import { useEffect, useState } from "react";
import API from "../services/api";
import socket from "../services/socket";

function NotificationBell() {

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchNotifications = async () => {
    const res = await API.get("/notifications");
    setNotifications(res.data);
  };

  useEffect(() => {

    fetchNotifications();

    socket.on("newNotification", () => {
      fetchNotifications();
    });

  }, []);

  const unread = notifications.filter(n => !n.isRead).length;

  return (

    <div className="relative">

      <button
        onClick={()=>setOpen(!open)}
        className="text-2xl"
      >
        🔔 {unread > 0 && (
          <span className="text-red-500">
            {unread}
          </span>
        )}
      </button>

      {open && (

        <div className="absolute right-0 mt-2 w-72 bg-white shadow rounded p-4">

          {notifications.length === 0 && (
            <p>No notifications</p>
          )}

          {notifications.map((n,i)=>(
            <div key={i} className="border-b py-2">
              <p className="font-semibold">{n.title}</p>
              <p className="text-sm text-gray-500">{n.message}</p>
            </div>
          ))}

        </div>

      )}

    </div>

  );

}

export default NotificationBell;