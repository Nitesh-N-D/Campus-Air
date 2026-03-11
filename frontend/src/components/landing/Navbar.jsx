import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed w-full backdrop-blur-lg bg-white/70 border-b z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-xl font-bold text-blue-600">
          Campus Air
        </h1>

        <div className="flex gap-6 items-center">

          <a href="#features" className="hover:text-blue-600">
            Features
          </a>

          <a href="#how" className="hover:text-blue-600">
            How it Works
          </a>

          <Link to="/login">
            <Button>Login with Google</Button>
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;