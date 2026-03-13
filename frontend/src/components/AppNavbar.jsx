import { useNavigate } from "react-router-dom"
import { ArrowLeft, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import NotificationBell from "./NotificationBell"
import { logoutUser } from "../services/logout"

function AppNavbar({ title }) {

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  return (

    <div className="flex items-center justify-between border-b bg-white px-6 py-4 sticky top-0 z-40">

      {/* Left */}
      <div className="flex items-center gap-4">

        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
        </Button>

        <h1 className="text-xl font-semibold">
          {title}
        </h1>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        <NotificationBell />

        <Button
          variant="outline"
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut size={16} />
          Logout
        </Button>

      </div>

    </div>

  )

}

export default AppNavbar;
