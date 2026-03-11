import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"

function Stats() {

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  })

  return (
    <section ref={ref} className="py-24 bg-white">

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">

        <div>
          <h2 className="text-5xl font-bold text-blue-600">

            {inView && <CountUp end={100} duration={2} />}+

          </h2>

          <p className="text-gray-600 mt-2">
            Students Connected
          </p>
        </div>

        <div>
          <h2 className="text-5xl font-bold text-purple-600">

            {inView && <CountUp end={35} duration={2} />}+

          </h2>

          <p className="text-gray-600 mt-2">
            Campus Events Hosted
          </p>
        </div>

        <div>
          <h2 className="text-5xl font-bold text-green-600">

            {inView && <CountUp end={50} duration={2} />}+

          </h2>

          <p className="text-gray-600 mt-2">
            Announcements Posted
          </p>
        </div>

      </div>

    </section>
  )
}

export default Stats;