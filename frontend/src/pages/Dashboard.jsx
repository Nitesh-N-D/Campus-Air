import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import NotificationBell from "../components/NotificationBell";
import AlertBanner from "../components/AlertBanner";
import AppNavbar from "../components/AppNavbar";
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

      {/* Top Navbar */}
      <AppNavbar title="Dashboard" />

      <div className="max-w-6xl mx-auto px-6 py-8">

        <AlertBanner />

        {/* Header */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            Campus Air Dashboard
          </h1>

          <NotificationBell />

        </div>

        {/* User Profile */}
        {user && (
          <Card className="mb-8 shadow-sm">

            <CardContent className="flex items-center gap-6 p-6">

              {user.profileImage && (
                <img
                  src={user.profileImage}
                  alt="profile"
                  className="w-16 h-16 rounded-full"
                />
              )}

              <div>

                <h2 className="text-lg font-semibold">
                  {user.name}
                </h2>

                <p className="text-gray-500">
                  {user.email}
                </p>

                <p className="text-sm mt-1 text-blue-600 font-medium">
                  Role: {user.role}
                </p>

              </div>

            </CardContent>

          </Card>
        )}

        {/* Dashboard Actions */}
        <div className="grid md:grid-cols-3 gap-4">

          {/* ADMIN CONTROLS */}
          {user?.role?.toLowerCase() === "admin" && (
            <>
              <Link to="/create-event">
                <Button className="w-full">Create Event</Button>
              </Link>

              <Link to="/create-announcement">
                <Button className="w-full">Post Announcement</Button>
              </Link>

              <Link to="/create-alert">
                <Button className="w-full">Send Alert</Button>
              </Link>

              <Link to="/upload-students">
                <Button className="w-full">Upload Students</Button>
              </Link>

              <Link to="/students">
                <Button className="w-full">Manage Students</Button>
              </Link>

              <Link to="/analytics">
                <Button className="w-full">View Analytics</Button>
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

  );
}

export default Dashboard;