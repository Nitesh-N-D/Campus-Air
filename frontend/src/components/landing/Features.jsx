import { Card, CardContent } from "@/components/ui/card"
import { Bell, Calendar, Upload, Mail } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Calendar,
    title: "Event Management",
    desc: "Admins can create and manage campus events easily."
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    desc: "Students instantly receive updates via notifications."
  },
  {
    icon: Mail,
    title: "Email Alerts",
    desc: "Important announcements are automatically emailed."
  },
  {
    icon: Upload,
    title: "CSV Student Import",
    desc: "Upload and manage student lists quickly."
  }
]

function Features() {

  return (
    <section
      id="features"
      className="py-28 relative bg-gradient-to-b from-white to-gray-50"
    >

      <motion.h2
        initial={{ opacity:0, y:30 }}
        whileInView={{ opacity:1, y:0 }}
        transition={{ duration:0.6 }}
        viewport={{ once:true }}
        className="text-4xl font-bold text-center mb-16"
      >
        Powerful Features
      </motion.h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">

        {features.map((f, i) => (

          <motion.div
            key={i}
            initial={{ opacity:0, y:40 }}
            whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.5, delay:i*0.1 }}
            viewport={{ once:true }}
          >

            <Card className="
            backdrop-blur-xl
            bg-white/60
            border border-white/20
            shadow-lg
            hover:shadow-2xl
            hover:-translate-y-2
            transition duration-300
            ">

              <CardContent className="p-8 text-center">

                <f.icon
                  className="mx-auto mb-4 text-blue-600"
                  size={34}
                />

                <h3 className="font-semibold text-lg mb-2">
                  {f.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {f.desc}
                </p>

              </CardContent>

            </Card>

          </motion.div>

        ))}

      </div>

    </section>
  )
}

export default Features;