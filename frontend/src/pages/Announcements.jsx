import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Megaphone, Pencil, Trash2 } from "lucide-react";
import API from "../services/api";
import AdminShell from "../components/AdminShell";
import EmptyState from "../components/EmptyState";
import useCurrentUser from "../hooks/useCurrentUser";
import { Button } from "@/components/ui/button";

function Announcements() {
  const navigate = useNavigate();
  const { isAdmin } = useCurrentUser();
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    API.get("/announcements")
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async (announcementId) => {
    const shouldDelete = window.confirm("Delete this announcement permanently?");

    if (!shouldDelete) {
      return;
    }

    try {
      setDeleteId(announcementId);
      await API.delete(`/announcements/${announcementId}`);
      setAnnouncements((currentAnnouncements) =>
        currentAnnouncements.filter((announcement) => announcement._id !== announcementId)
      );
    } catch (error) {
      console.error(error);
      window.alert(error?.response?.data?.message || "Unable to delete this announcement right now.");
    } finally {
      setDeleteId("");
    }
  };

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

                {isAdmin ? (
                  <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 rounded-2xl"
                      onClick={() => navigate(`/edit-announcement/${announcement._id}`)}
                    >
                      <Pencil size={16} />
                      Edit announcement
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 rounded-2xl border-rose-200 text-rose-700 hover:bg-rose-50 hover:text-rose-800"
                      disabled={deleteId === announcement._id}
                      onClick={() => handleDelete(announcement._id)}
                    >
                      {deleteId === announcement._id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                      Delete announcement
                    </Button>
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

export default Announcements;
