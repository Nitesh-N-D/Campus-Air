import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import { motion } from "framer-motion"
import "swiper/css"

const events = [
  {
    title: "AI Hackathon",
    date: "March 25",
    location: "Auditorium",
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "Tech Symposium",
    date: "April 2",
    location: "Main Hall",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Placement Workshop",
    date: "April 10",
    location: "Seminar Hall",
    color: "from-green-500 to-emerald-600"
  },
  {
    title: "Startup Pitch Day",
    date: "April 18",
    location: "Innovation Hub",
    color: "from-orange-500 to-red-500"
  }
]

function EventShowcase() {

  return (
    <section className="py-28 bg-gradient-to-b from-white to-gray-50">

      <h2 className="text-4xl font-bold text-center mb-16">
        Upcoming Campus Events
      </h2>

      <div className="max-w-6xl mx-auto">

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >

          {events.map((event, i) => (

            <SwiperSlide key={i}>

              <motion.div
                whileHover={{ scale:1.05, rotateX:5, rotateY:-5 }}
                transition={{ duration:0.3 }}
                className={`
                p-8 rounded-2xl text-white shadow-xl
                bg-gradient-to-r ${event.color}
                cursor-pointer
                `}
              >

                <h3 className="text-xl font-semibold mb-2">
                  {event.title}
                </h3>

                <p className="text-sm opacity-90">
                  {event.date}
                </p>

                <p className="text-sm opacity-90">
                  {event.location}
                </p>

              </motion.div>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </section>
  )
}

export default EventShowcase;