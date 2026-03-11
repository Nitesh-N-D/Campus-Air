function HowItWorks() {

  return (
    <section id="how" className="py-24 bg-blue-50 text-center">

      <h2 className="text-4xl font-bold mb-16">
        How Campus Air Works
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">

        <div>
          <h3 className="text-xl font-semibold mb-2">
            Admin Posts Event
          </h3>
          <p className="text-gray-600">
            Admin logs in and creates campus announcements or events.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">
            Students Receive Notification
          </h3>
          <p className="text-gray-600">
            Real-time alerts and notifications are sent instantly.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">
            Stay Updated
          </h3>
          <p className="text-gray-600">
            Students never miss important updates from the campus.
          </p>
        </div>

      </div>

    </section>
  );
}

export default HowItWorks;