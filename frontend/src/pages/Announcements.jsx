import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";
import API from "../services/api";
import AdminShell from "../components/AdminShell";
import EmptyState from "../components/EmptyState";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.get("/announcements")
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AdminShell
      title="Announcements"
      eyebrow="Communication"
      description="Long-form updates presented with a cleaner editorial layout so important messages feel official and easy to read."
    >
      {isLoading ? (
        <section className="space-y-5">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-56 animate-pulse rounded-[28px] bg-slate-100" />
          ))}
        </section>
      ) : announcements.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="No announcements yet"
          description="Official campus notices will appear here once announcements are published."
        />
      ) : (
        <section className="space-y-5">
          {announcements.map((announcement) => (
            <article
              key={announcement._id}
              className="overflow-hidden rounded-[28px] border border-white/70 bg-white/85 shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
            >
              {announcement.image && (
                <img
                  src={announcement.image}
                  alt={announcement.title}
                  className="h-56 w-full object-cover"
                />
              )}

              <div className="p-7">
                <div className="mb-4 inline-flex rounded-full bg-teal-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700">
                  Official Notice
                </div>

                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                  {announcement.title}
                </h2>

                <p className="mt-4 max-w-4xl text-sm leading-8 text-slate-600">
                  {announcement.content}
                </p>
              </div>
            </article>
          ))}
        </section>
      )}
    </AdminShell>
  );
}

export default Announcements;
