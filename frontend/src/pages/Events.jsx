import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Loader2, MapPin, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import API from "../services/api";
import AdminShell from "../components/AdminShell";
import EmptyState from "../components/EmptyState";
import useCurrentUser from "../hooks/useCurrentUser";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Events() {
  const navigate = useNavigate();
  const { isAdmin } = useCurrentUser();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    API.get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async (eventId) => {
    const shouldDelete = window.confirm("Delete this event permanently?");

    if (!shouldDelete) {
      return;
    }

    try {
      setDeleteId(eventId);
      await API.delete(`/events/${eventId}`);
      setEvents((currentEvents) => currentEvents.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error(error);
      window.alert(error?.response?.data?.message || "Unable to delete this event right now.");
    } finally {
      setDeleteId("");
    }
  };

  return (
    <AdminShell
      title="Events"
      eyebrow="Publishing"
      description="A premium event gallery for upcoming campus moments, designed to feel editorial rather than cluttered."
    >
      {isLoading ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-[26rem] animate-pulse rounded-[28px] bg-slate-100" />
          ))}
        </section>
      ) : events.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="No events available"
          description="Published campus events will appear here once they are created."
        />
      ) : (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <article
              key={event._id}
              className="overflow-hidden rounded-[28px] border border-white/70 bg-white/85 shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
            >
              <img
                src={event.image}
                alt={event.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <div className="mb-4 inline-flex rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700">
                  Campus Event
                </div>

                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                  {event.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {event.description}
                </p>

                <div className="mt-6 space-y-3 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-teal-700" />
                    {new Date(event.date).toDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-teal-700" />
                    {event.location}
                  </div>
                </div>

                {isAdmin ? (
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Admin actions
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                        Manage
                        <MoreHorizontal size={16} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Event controls</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate(`/edit-event/${event._id}`)}>
                          <Pencil size={16} className="mr-2" />
                          Edit event
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-rose-700 hover:bg-rose-50"
                          onClick={() => handleDelete(event._id)}
                        >
                          {deleteId === event._id ? (
                            <Loader2 size={16} className="mr-2 animate-spin" />
                          ) : (
                            <Trash2 size={16} className="mr-2" />
                          )}
                          Delete event
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </section>
      )}
    </AdminShell>
  );
}

export default Events;
