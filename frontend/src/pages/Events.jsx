import { useEffect, useState } from "react";
import API from "../services/api";

function Events() {

  const [events, setEvents] = useState([]);

  useEffect(() => {

    API.get("/events")
      .then(res => setEvents(res.data))
      .catch(err => console.log(err));

  }, []);

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Campus Events
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {events.map(event => (

          <div key={event._id} className="border rounded shadow">

            <img
              src={event.image}
              alt="event"
              className="h-48 w-full object-cover"
            />

            <div className="p-4">

              <h2 className="text-xl font-bold">
                {event.title}
              </h2>

              <p className="text-gray-600">
                {event.description}
              </p>

              <p className="mt-2 text-sm">
                📅 {new Date(event.date).toDateString()}
              </p>

              <p className="text-sm">
                📍 {event.location}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Events;