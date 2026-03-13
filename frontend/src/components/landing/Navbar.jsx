import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["features", "how"];

      sections.forEach((section) => {
        const el = document.getElementById(section);

        if (el) {
          const top = el.offsetTop - 120;
          const bottom = top + el.offsetHeight;

          if (window.scrollY >= top && window.scrollY < bottom) {
            setActive(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "px-4 py-3"
          : "px-6 py-5"
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-6 py-3 transition-all ${
        scrolled
          ? "border-white/70 bg-white/78 shadow-lg backdrop-blur-xl"
          : "border-white/50 bg-white/55 backdrop-blur-md"
      }`}>
        <h1 className="text-lg font-semibold tracking-tight text-slate-900">
          Campus Air
        </h1>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className={`text-sm transition hover:text-teal-700 ${
              active === "features" ? "font-semibold text-teal-700" : "text-slate-600"
            }`}
          >
            Features
          </a>

          <a
            href="#how"
            className={`text-sm transition hover:text-teal-700 ${
              active === "how" ? "font-semibold text-teal-700" : "text-slate-600"
            }`}
          >
            How it Works
          </a>

          <Link to="/signup">
            <Button className="h-11 rounded-full px-5 text-sm">Create account</Button>
          </Link>

          <Link to="/login">
            <Button variant="outline" className="h-11 rounded-full px-5 text-sm">Login</Button>
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-[28px] border border-white/70 bg-white/92 p-6 shadow-lg backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-5 text-center">
            <a href="#features" onClick={() => setMobileOpen(false)} className="text-slate-700">
              Features
            </a>
            <a href="#how" onClick={() => setMobileOpen(false)} className="text-slate-700">
              How it Works
            </a>
            <Link to="/signup" onClick={() => setMobileOpen(false)}>
              <Button className="h-11 w-full rounded-full">Create account</Button>
            </Link>
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="h-11 w-full rounded-full">Login</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
