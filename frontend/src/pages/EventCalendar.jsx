import { useEffect, useState } from "react";
import API from "../services/api";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

function EventCalendar() {

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {

    API.get("/events")
      .then(res => {

        const formatted = res.data.map(e => ({
          title: e.title,
          date: e.date,
          extendedProps: {
            description: e.description,
            location: e.location,
            image: e.image
          }
        }));

        setEvents(formatted);

      });

  }, []);

  /* EVENT CLICK HANDLER */

  const handleEventClick = (info) => {

    setSelectedEvent({
      title: info.event.title,
      date: info.event.startStr,
      description: info.event.extendedProps.description,
      location: info.event.extendedProps.location,
      image: info.event.extendedProps.image
    });

  };

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Campus Events Calendar
      </h1>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        height="80vh"
      />

      {/* EVENT POPUP */}

      {selectedEvent && (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-[420px] max-h-[80vh] overflow-y-auto">

            <h2 className="text-2xl font-bold mb-3">
              {selectedEvent.title}
            </h2>

            {selectedEvent.image && (
              <img
                src={selectedEvent.image}
                alt="event"
                className="mb-3 rounded"
              />
            )}

            <p className="mb-2">
              <strong>Date:</strong>{" "}
{new Date(selectedEvent.date).toLocaleString()}
            </p>

            <p className="mb-2">
              <strong>Location:</strong> {selectedEvent.location}
            </p>

            <p className="mb-4">
              {selectedEvent.description}
            </p>

            <button
  onClick={() => setSelectedEvent(null)}
  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
>
  Close
</button>

          </div>

        </div>

      )}

    </div>

  );

}

export default EventCalendar;