import { Calendar, Bell, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Calendar,
    title: "Admin Posts Event",
    desc: "Admins create campus events and announcements."
  },
  {
    icon: Bell,
    title: "Students Receive Notification",
    desc: "Real-time alerts are delivered instantly."
  },
  {
    icon: CheckCircle,
    title: "Stay Updated",
    desc: "Students never miss important campus updates."
  }
]

function HowItWorks() {

  return (
    <section id="how" className="py-28 bg-white">

      <h2 className="text-4xl font-bold text-center mb-16">
        How Campus Air Works
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">

        {steps.map((step,i)=>{

          const Icon = step.icon

          return(

            <div
              key={i}
              className="p-6 rounded-xl hover:shadow-lg transition"
            >

              <Icon
                className="mx-auto text-blue-600 mb-4"
                size={36}
              />

              <h3 className="font-semibold text-lg mb-2">
                {step.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {step.desc}
              </p>

            </div>

          )

        })}

      </div>

    </section>
  )
}

export default HowItWorks;