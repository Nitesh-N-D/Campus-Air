import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import NotificationBell from "../components/NotificationBell";
import AlertBanner from "../components/AlertBanner";
import AppNavbar from "../components/AppNavbar";
import Sidebar from "../components/Sidebar";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Dashboard() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/auth/current_user")
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, []);

  return (

    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <AppNavbar title="Dashboard" />

      <div className="flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-10">

          <AlertBanner />

          {/* Header */}
          <div className="flex justify-between items-center mb-8">

            <h1 className="text-3xl font-bold">
              Campus Air Dashboard
            </h1>

            <NotificationBell />

          </div>

          {/* Welcome Card */}
          {user && (
            <Card className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">

              <CardContent className="p-6 flex justify-between items-center">

                <div>

                  <h2 className="text-xl font-semibold">
                    Welcome back, {user.name}
                  </h2>

                  <p className="opacity-80 text-sm">
                    Manage campus events, announcements, and alerts.
                  </p>

                </div>

                {user.profileImage && (
                  <img
                    src={user.profileImage}
                    alt="profile"
                    className="w-14 h-14 rounded-full border"
                  />
                )}

              </CardContent>

            </Card>
          )}

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <p className="text-gray-500 text-sm">
                  Total Events
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  12
                </h3>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <p className="text-gray-500 text-sm">
                  Announcements
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  8
                </h3>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <p className="text-gray-500 text-sm">
                  Students
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  150
                </h3>
              </CardContent>
            </Card>

          </div>

          {/* Dashboard Actions */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* ADMIN CONTROLS */}
            {user?.role?.toLowerCase() === "admin" && (
              <>
                <Link to="/create-event">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Create Event
                  </Button>
                </Link>

                <Link to="/create-announcement">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Post Announcement
                  </Button>
                </Link>

                <Link to="/create-alert">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Send Alert
                  </Button>
                </Link>

                <Link to="/upload-students">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Upload Students
                  </Button>
                </Link>

                <Link to="/students">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Manage Students
                  </Button>
                </Link>

                <Link to="/analytics">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    View Analytics
                  </Button>
                </Link>
              </>
            )}

            {/* COMMON FEATURES */}
            <Link to="/events">
              <Button variant="secondary" className="w-full">
                View Events
              </Button>
            </Link>

            <Link to="/announcements">
              <Button variant="secondary" className="w-full">
                View Announcements
              </Button>
            </Link>

            <Link to="/calendar">
              <Button variant="secondary" className="w-full">
                Event Calendar
              </Button>
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;