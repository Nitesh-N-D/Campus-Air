import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import Events from "./pages/Events";
import CreateAnnouncement from "./pages/CreateAnnouncement";
import CreateAlert from "./pages/CreateAlert";
import Announcements from "./pages/Announcements";
import UploadStudents from "./pages/UploadStudents";
import Students from "./pages/Students";
import AdminAnalytics from "./pages/AdminAnalytics";
import EventCalendar from "./pages/EventCalendar";
import socket from "./services/socket";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  useEffect(() => {
    socket.on("newEvent", (data) => {
      toast.success(data.title);
    });

    socket.on("newAnnouncement", (data) => {
      toast.info(data.title);
    });

    return () => {
      socket.off("newEvent");
      socket.off("newAnnouncement");
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
        <Route path="/upload-students" element={<ProtectedRoute><UploadStudents /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/create-announcement" element={<ProtectedRoute><CreateAnnouncement /></ProtectedRoute>} />
        <Route path="/create-alert" element={<ProtectedRoute><CreateAlert /></ProtectedRoute>} />
        <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
        <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><AdminAnalytics /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><EventCalendar /></ProtectedRoute>} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        theme="light"
        toastClassName="!rounded-[20px] !border !border-slate-200 !bg-white !text-slate-900 !shadow-lg"
      />
    </>
  );
}

export default App;
