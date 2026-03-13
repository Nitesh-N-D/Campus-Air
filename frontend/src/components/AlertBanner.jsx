import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { toast } from "react-toastify";
import API from "../services/api";
import socket from "../services/socket";

function AlertBanner() {
  const [alert, setAlert] = useState(null);
  const [visible, setVisible] = useState(() => localStorage.getItem("alertClosed") !== "true");

  useEffect(() => {
    if (!visible) {
      return;
    }

    API.get("/alerts").then((res) => {
      const highAlerts = res.data.filter((item) => item.priority === "High");

      if (highAlerts.length) {
        setAlert(highAlerts[0]);
      }
    });

    socket.on("newAlert", (data) => {
      if (["High", "Medium", "Low"].includes(data.priority)) {
        setAlert(data);
        setVisible(true);

        toast.warning(`New Alert: ${data.title}`, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    });

    return () => socket.off("newAlert");
  }, [visible]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem("alertClosed", "true");
  };

  if (!alert || !visible) {
    return null;
  }

  let tone = "border-teal-200 bg-teal-50 text-teal-900";
  let animate = "";

  if (alert.priority === "High") {
    tone = "border-rose-200 bg-rose-50 text-rose-900";
    animate = "animate-pulse";
  }

  if (alert.priority === "Medium") {
    tone = "border-amber-200 bg-amber-50 text-amber-900";
  }

  return (
    <div className={`${tone} ${animate} overflow-hidden rounded-[22px] border shadow-sm`}>
      <div className="flex items-start justify-between gap-4 px-5 py-4">
        <div className="flex gap-3">
          <div className="rounded-2xl bg-white/70 p-2">
            <AlertTriangle size={18} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold">{alert.title}</span>
              <span className="rounded-full bg-white/70 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]">
                {alert.priority}
              </span>
            </div>

            <p className="mt-1 text-sm leading-6 opacity-80">{alert.message}</p>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="rounded-full border border-rose-200 bg-rose-50 p-1.5 text-rose-700 transition hover:bg-rose-100"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default AlertBanner;
