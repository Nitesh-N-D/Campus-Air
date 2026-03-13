import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import API from "../services/api";
import AdminShell from "../components/AdminShell";
import { Button } from "@/components/ui/button";

function EventCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    API.get("/events").then((res) => {
      const formatted = res.data.map((event) => ({
        title: event.title,
        date: event.date,
        extendedProps: {
          description: event.description,
          location: event.location,
          image: event.image,
        },
      }));

      setEvents(formatted);
    });
  }, []);

  const handleEventClick = (info) => {
    setSelectedEvent({
      title: info.event.title,
      date: info.event.startStr,
      description: info.event.extendedProps.description,
      location: info.event.extendedProps.location,
      image: info.event.extendedProps.image,
    });
  };

  return (
    <AdminShell
      title="Event Calendar"
      eyebrow="Scheduling"
      description="A cleaner calendar view for planning the rhythm of campus life without losing event detail."
    >
      <section className="page-section">
        <div className="calendar-shell overflow-hidden rounded-[24px] bg-white">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
            height="80vh"
          />
        </div>
      </section>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-xl overflow-hidden rounded-[28px] border border-white/60 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.25)]">
            {selectedEvent.image && (
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="h-60 w-full object-cover"
              />
            )}

            <div className="p-7">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                {selectedEvent.title}
              </h2>

              <div className="mt-4 space-y-2 text-sm text-slate-500">
                <p>{new Date(selectedEvent.date).toLocaleString()}</p>
                <p>{selectedEvent.location}</p>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                {selectedEvent.description}
              </p>

              <Button
                onClick={() => setSelectedEvent(null)}
                className="mt-6 h-11 rounded-2xl bg-rose-600 px-5 text-white hover:bg-rose-700"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

export default EventCalendar;
