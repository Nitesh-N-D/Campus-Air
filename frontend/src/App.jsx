import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import Events from "./pages/Events";
import CreateAnnouncement from "./pages/CreateAnnouncement";
import Announcements from "./pages/Announcements";
import UploadStudents from "./pages/UploadStudents";
import Students from "./pages/Students";
import AdminAnalytics from "./pages/AdminAnalytics";
import EventCalendar from "./pages/EventCalendar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import socket from "./services/socket";

/* ---------- Custom Cursor ---------- */

function Cursor() {

  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {

    const move = (e) => {
      setPos({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);

  }, []);

  return (
    <div
      style={{
        left: pos.x,
        top: pos.y
      }}
      className="fixed w-6 h-6 rounded-full bg-blue-500/30 blur-md pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
    />
  );
}

/* ---------- App ---------- */

function App() {

  useEffect(() => {

    socket.on("newEvent", (data) => {
      toast.success(`🔔 ${data.title}`);
    });

    socket.on("newAnnouncement", (data) => {
      toast.info(`📢 ${data.title}`);
    });

    return () => {
      socket.off("newEvent");
      socket.off("newAnnouncement");
    };

  }, []);

  return (
    <>

      {/* Custom Cursor */}
      <Cursor />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/upload-students" element={<UploadStudents />} />
        <Route path="/events" element={<Events />} />
        <Route path="/create-announcement" element={<CreateAnnouncement />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/students" element={<Students />} />
        <Route path="/analytics" element={<AdminAnalytics />} />
        <Route path="/calendar" element={<EventCalendar />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={4000} />

    </>
  );
}

export default App;