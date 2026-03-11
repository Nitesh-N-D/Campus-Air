import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

function Navbar() {

  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)

  /* ---------- Navbar Shrink on Scroll ---------- */

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 40)

      const sections = ["features", "how"]

      sections.forEach((section) => {

        const el = document.getElementById(section)

        if (el) {
          const top = el.offsetTop - 120
          const bottom = top + el.offsetHeight

          if (window.scrollY >= top && window.scrollY < bottom) {
            setActive(section)
          }
        }

      })

    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)

  }, [])

  return (
    <nav
      className={`
      fixed w-full z-50 transition-all duration-300
      ${scrolled
        ? "backdrop-blur-lg bg-white/80 shadow-sm py-2"
        : "bg-white/70 py-4"
      }
      border-b
      `}
    >

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">

        {/* Logo */}

        <h1 className="text-xl font-bold text-blue-600">
          Campus Air
        </h1>

        {/* Desktop Menu */}

        <div className="hidden md:flex gap-8 items-center">

          <a
            href="#features"
            className={`transition hover:text-blue-600
            ${active === "features" ? "text-blue-600 font-semibold" : ""}
            `}
          >
            Features
          </a>

          <a
            href="#how"
            className={`transition hover:text-blue-600
            ${active === "how" ? "text-blue-600 font-semibold" : ""}
            `}
          >
            How it Works
          </a>

          <Link to="/login">
            <Button>
              Login with Google
            </Button>
          </Link>

        </div>

        {/* Mobile Menu Button */}

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Menu */}

      {mobileOpen && (

        <div className="md:hidden bg-white border-t">

          <div className="flex flex-col items-center gap-6 py-6">

            <a
              href="#features"
              onClick={() => setMobileOpen(false)}
              className="hover:text-blue-600"
            >
              Features
            </a>

            <a
              href="#how"
              onClick={() => setMobileOpen(false)}
              className="hover:text-blue-600"
            >
              How it Works
            </a>

            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
            >
              <Button>
                Login with Google
              </Button>
            </Link>

          </div>

        </div>

      )}

    </nav>
  )
}

export default Navbar;