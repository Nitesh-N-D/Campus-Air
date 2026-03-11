import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CTA() {

  return (
    <section className="relative py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center overflow-hidden">

      {/* subtle background glow */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute w-[500px] h-[500px] bg-white/20 blur-3xl rounded-full top-[-150px] left-[25%]" />

        <div className="absolute w-[400px] h-[400px] bg-white/20 blur-3xl rounded-full bottom-[-120px] right-[25%]" />

      </div>

      <div className="max-w-4xl mx-auto px-6">

        <motion.h2
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          transition={{ duration:0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Join Campus Air Today
        </motion.h2>

        <motion.p
          initial={{ opacity:0 }}
          whileInView={{ opacity:1 }}
          transition={{ delay:0.2 }}
          className="text-lg text-blue-100 mb-10"
        >
          Stay updated with campus events, announcements,
          alerts, and real-time notifications in one platform.
        </motion.p>

        {/* Highlighted Login Button */}

        <motion.div
          initial={{ opacity:0, scale:0.9 }}
          whileInView={{ opacity:1, scale:1 }}
          transition={{ delay:0.3 }}
        >

          <Link to="/login">

            <Button
              size="lg"
              variant="secondary"
              className="
              text-lg font-semibold px-10 py-6
              shadow-xl
              hover:scale-105 hover:shadow-2xl
              transition
              ring-4 ring-white/30
              "
            >
              Login with Google
            </Button>

          </Link>

        </motion.div>

      </div>

    </section>
  );
}

export default CTA;