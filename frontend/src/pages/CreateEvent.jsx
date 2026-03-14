import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import AdminShell from "../components/AdminShell";
import AccessNotice from "../components/AccessNotice";
import useCurrentUser from "../hooks/useCurrentUser";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

function CreateEvent() {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useCurrentUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [isImportant, setIsImportant] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const nextErrors = {};

    if (!title.trim()) nextErrors.title = "Event title is required.";
    if (!description.trim()) nextErrors.description = "Description is required.";
    if (!date) nextErrors.date = "Event date is required.";
    if (!location.trim()) nextErrors.location = "Location is required.";
    if (!image) nextErrors.image = "Please upload an event image.";

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      setError("Please fill in all required event details before publishing.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("location", location);
    formData.append("image", image);
    formData.append("isImportant", isImportant);

    try {
      setIsSubmitting(true);
      await API.post("/events/create", formData);
      toast.success(isImportant ? "Event published and email delivery started." : "Event published successfully.");
      navigate("/events");
    } catch (submitError) {
      console.error(submitError);
      setError(submitError?.response?.data?.message || submitError?.response?.data || "Unable to publish the event right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminShell
      title="Create Event"
      eyebrow="Publishing"
      description="Craft a polished event listing with strong hierarchy, validation, and a production-ready publishing experience."
    >
      {!isLoading && !isAdmin ? (
        <AccessNotice description="Only the approved admin Gmail accounts can publish new events. Viewer accounts can still browse event listings and announcements." />
      ) : (
        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={handleSubmit} className="page-section space-y-5">
            {error ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Event title</label>
              <input
                type="text"
                placeholder="AI Summit 2026"
                className={`premium-input ${fieldErrors.title ? "border-rose-300 focus:ring-rose-100" : ""}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {fieldErrors.title ? <p className="mt-2 text-xs text-rose-600">{fieldErrors.title}</p> : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
              <textarea
                placeholder="Outline the purpose, speakers, and experience students can expect."
                className={`premium-textarea ${fieldErrors.description ? "border-rose-300 focus:ring-rose-100" : ""}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {fieldErrors.description ? <p className="mt-2 text-xs text-rose-600">{fieldErrors.description}</p> : null}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Date</label>
                <input
                  type="date"
                  className={`premium-input ${fieldErrors.date ? "border-rose-300 focus:ring-rose-100" : ""}`}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                {fieldErrors.date ? <p className="mt-2 text-xs text-rose-600">{fieldErrors.date}</p> : null}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Location</label>
                <input
                  type="text"
                  placeholder="Innovation Hall"
                  className={`premium-input ${fieldErrors.location ? "border-rose-300 focus:ring-rose-100" : ""}`}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                {fieldErrors.location ? <p className="mt-2 text-xs text-rose-600">{fieldErrors.location}</p> : null}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Event image</label>
              <input
                type="file"
                className={`premium-input file:mr-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white ${fieldErrors.image ? "border-rose-300 focus:ring-rose-100" : ""}`}
                onChange={(e) => setImage(e.target.files[0])}
              />
              {fieldErrors.image ? <p className="mt-2 text-xs text-rose-600">{fieldErrors.image}</p> : null}
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-200"
                checked={isImportant}
                onChange={(e) => setIsImportant(e.target.checked)}
              />
              <span>Send this event as an email update to all students when it is especially important.</span>
            </label>

            <Button className="h-12 rounded-2xl px-6 text-sm font-semibold" disabled={isSubmitting}>
              {isSubmitting ? "Publishing..." : "Publish event"}
            </Button>
          </form>

          <aside className="page-section">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">Preview Guidance</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">Production-ready event publishing</h3>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
              <li>Use a short, direct title with one clear purpose.</li>
              <li>Include a location and date so students can act immediately.</li>
              <li>Publishing is blocked until the required fields are complete.</li>
            </ul>
          </aside>
        </section>
      )}
    </AdminShell>
  );
}

export default CreateEvent;
