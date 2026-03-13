import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Calendar, Bell, Users, BarChart, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logoutUser } from "../services/logout"

function Sidebar() {

  const location = useLocation()

  const logout = async () => {
    try {
      await logoutUser()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const nav = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard"
    },
    {
      name: "Events",
      icon: Calendar,
      path: "/events"
    },
    {
      name: "Announcements",
      icon: Bell,
      path: "/announcements"
    },
    {
      name: "Students",
      icon: Users,
      path: "/students"
    },
    {
      name: "Analytics",
      icon: BarChart,
      path: "/analytics"
    }
  ]

  return (

    <div className="w-64 h-screen border-r bg-white flex flex-col justify-between">

      <div>

        {/* Logo */}
        <div className="p-6 border-b">

          <h1 className="text-xl font-bold">
            Campus Air
          </h1>

        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2">

          {nav.map((item) => {

            const Icon = item.icon

            return (

              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition 
                ${location.pathname === item.path
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-50"}`}
              >

                <Icon size={18} />

                {item.name}

              </Link>

            )

          })}

        </div>

      </div>

      {/* Logout */}
      <div className="p-4 border-t">

        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={logout}
        >
          <LogOut size={16} />
          Logout
        </Button>

      </div>

    </div>

  )

}

export default Sidebar;
