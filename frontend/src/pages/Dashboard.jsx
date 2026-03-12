import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import NotificationBell from "../components/NotificationBell";
import AlertBanner from "../components/AlertBanner";

function Dashboard() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/auth/current_user")
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-10">
 
      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Campus Air Dashboard
        </h1>

        <NotificationBell />

      </div>

      {/* User Profile */}
      {user && (
        <div className="bg-white p-6 rounded shadow mb-8 w-72">

          {user.profileImage && (
            <img
              src={user.profileImage}
              alt="profile"
              className="w-20 h-20 rounded-full"
            />
          )}

          <h2 className="text-xl mt-4 font-semibold">
            {user.name}
          </h2>

          <p className="text-gray-600">
            {user.email}
          </p>

          <p className="text-sm mt-2 text-blue-600 font-semibold">
            Role: {user.role}
          </p>

        </div>
      )}

      {/* Dashboard Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">

        {/* ADMIN CONTROLS */}
      {user?.role?.toLowerCase() === "admin" && (
          <>
            <Link
              to="/create-event"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Create Event
            </Link>

            <Link
              to="/create-announcement"
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
            >
              Post Announcement
            </Link>
            <Link
              to="/create-alert"
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Send Alert
            </Link>
            <Link
              to="/upload-students"
              className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
            >
              Upload Students
            </Link>
            <Link
    to="/students"
    className="bg-indigo-600 text-white px-6 py-2 rounded"
  >
    Manage Students
  </Link>
  <Link
  to="/analytics"
  className="bg-indigo-600 text-white px-6 py-2 rounded"
>
  View Analytics
</Link>
          </>
        )}

        {/* COMMON FEATURES */}
        <Link
          to="/events"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          View Events
        </Link>

        <Link
          to="/announcements"
          className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          View Announcements
        </Link>
        <Link
  to="/calendar"
  className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700"
>
  Event Calendar
</Link>
      </div>

    </div>
  );
}

export default Dashboard;