import { Card } from "@/components/ui/card";

const events = [
  {
    title: "AI Hackathon",
    date: "March 25",
    location: "Auditorium"
  },
  {
    title: "Tech Symposium",
    date: "April 2",
    location: "Main Hall"
  },
  {
    title: "Placement Workshop",
    date: "April 10",
    location: "Seminar Hall"
  }
];

function EventPreview() {

  return (
    <section className="py-24 bg-gray-50">

      <h2 className="text-4xl font-bold text-center mb-16">
        Upcoming Events
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">

        {events.map((event, i) => (

          <div key={i}>
            <Card className="p-6 shadow-lg">

              <h3 className="font-semibold text-lg mb-2">
                {event.title}
              </h3>

              <p className="text-gray-600">
                {event.date}
              </p>

              <p className="text-gray-500 text-sm">
                {event.location}
              </p>

            </Card>
          </div>

        ))}

      </div>

    </section>
  );
}

export default EventPreview;
