import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import AdminShell from "../components/AdminShell";
import AccessNotice from "../components/AccessNotice";
import useCurrentUser from "../hooks/useCurrentUser";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

function CreateAnnouncement() {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useCurrentUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isImportant, setIsImportant] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const nextErrors = {};

    if (!title.trim()) nextErrors.title = "Announcement title is required.";
    if (!content.trim()) nextErrors.content = "Announcement content is required.";
    if (!image) nextErrors.image = "Please upload a cover image.";

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      setError("Please complete all required announcement fields before publishing.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("isImportant", isImportant);

    try {
      setIsSubmitting(true);
      await API.post("/announcements/create", formData);
      toast.success(isImportant ? "Announcement published and email delivery started." : "Announcement published successfully.");
      navigate("/announcements");
    } catch (submitError) {
      console.error(submitError);
      setError(submitError?.response?.data?.message || submitError?.response?.data || "Unable to publish the announcement right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminShell
      title="Post Announcement"
      eyebrow="Communication"
      description="Write campus updates in a cleaner, production-level form with proper validation and clearer publishing feedback."
    >
      {!isLoading && !isAdmin ? (
        <AccessNotice description="Only the approved admin Gmail accounts can publish announcements. Viewer accounts can still read announcement pages normally." />
      ) : (
        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={handleSubmit} className="page-section space-y-5">
            {error ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Announcement title</label>
              <input
                type="text"
                placeholder="Semester registration deadline extended"
                className={`premium-input ${fieldErrors.title ? "border-rose-300 focus:ring-rose-100" : ""}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {fieldErrors.title ? <p className="mt-2 text-xs text-rose-600">{fieldErrors.title}</p> : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Content</label>
              <textarea
                placeholder="Provide the update, key dates, and any action students should take."
                className={`premium-textarea ${fieldErrors.content ? "border-rose-300 focus:ring-rose-100" : ""}`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {fieldErrors.content ? <p className="mt-2 text-xs text-rose-600">{fieldErrors.content}</p> : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Cover image</label>
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
              <span>Send this announcement as an email to all students.</span>
            </label>

            <Button className="h-12 rounded-2xl px-6 text-sm font-semibold" disabled={isSubmitting}>
              {isSubmitting ? "Publishing..." : "Publish announcement"}
            </Button>
          </form>

          <aside className="page-section">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">Writing Notes</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">Clear, complete, and validated</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Lead with the key update, keep the structure direct, and complete all required inputs before publishing. The form now blocks incomplete submissions clearly.
            </p>
          </aside>
        </section>
      )}
    </AdminShell>
  );
}

export default CreateAnnouncement;
