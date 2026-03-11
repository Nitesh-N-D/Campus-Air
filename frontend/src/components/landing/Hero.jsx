import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useState } from "react"

function Hero() {

  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 100
    const y = (e.clientY / window.innerHeight) * 100
    setMousePosition({ x, y })
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden py-32 cursor-none"
    >

      {/* Mouse Tracking Gradient (Vercel style) */}

      <div
        className="absolute inset-0 -z-20 transition-all duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99,102,241,0.25), transparent 40%)`
        }}
      />

      {/* Gradient mesh background */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute w-[600px] h-[600px] bg-blue-400/30 rounded-full blur-3xl animate-pulse top-[-100px] left-[20%]" />

        <div className="absolute w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-3xl animate-pulse bottom-[-100px] right-[20%]" />

      </div>

      <div className="max-w-6xl mx-auto text-center">

        <motion.h1
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7 }}
          className="text-6xl font-bold mb-6"
        >
          Campus Air
        </motion.h1>

        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          The smart campus communication platform for events,
          announcements, alerts, and student updates.
        </p>

        <div className="flex justify-center gap-4">

          <Link to="/login">
            <Button size="lg">
              Login with Google
            </Button>
          </Link>

          <Link to="/events">
            <Button variant="outline" size="lg">
              Explore Events
            </Button>
          </Link>

        </div>

      </div>

      {/* Floating UI Cards */}

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute left-[10%] top-[60%] bg-white shadow-xl rounded-xl p-4 hidden md:block"
      >
        📅 Event Posted
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute right-[10%] top-[60%] bg-white shadow-xl rounded-xl p-4 hidden md:block"
      >
        🔔 New Notification
      </motion.div>

    </section>
  )
}

export default Hero;