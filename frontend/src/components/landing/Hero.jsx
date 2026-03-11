import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative pt-32 pb-28 overflow-hidden">

      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-20 blur-3xl animate-pulse"></div>

      <div className="relative text-center">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl font-bold mb-6"
        >
          Campus Air
        </motion.h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          The smart campus communication platform for events,
          announcements, alerts, and student updates.
        </p>

        <div className="flex justify-center gap-4">

          <Link to="/login">
            <Button size="lg">Login with Google</Button>
          </Link>

          <Link to="/events">
            <Button variant="outline" size="lg">
              Explore Events
            </Button>
          </Link>

        </div>

      </div>
    </section>
  );
}

export default Hero;