import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import AdminShell from "../components/AdminShell";
import AccessNotice from "../components/AccessNotice";
import useCurrentUser from "../hooks/useCurrentUser";
import { Button } from "@/components/ui/button";

function CreateAlert() {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useCurrentUser();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("Low");
  const [expiresAt, setExpiresAt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/alerts", {
      title,
      message,
      priority,
      expiresAt,
    });

    navigate("/dashboard");
  };

  return (
    <AdminShell
      title="Send Alert"
      eyebrow="Urgent Messaging"
      description="Use a strong, calm layout for messages that need immediate visibility without looking chaotic."
    >
      {!isLoading && !isAdmin ? (
        <AccessNotice description="Only the approved admin Gmail accounts should send campus alerts. Viewer accounts remain read-only." />
      ) : (
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={handleSubmit} className="page-section space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Alert title
            </label>
            <input
              placeholder="Weather advisory"
              className="premium-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              placeholder="Describe what happened, who is affected, and what action to take next."
              className="premium-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Priority
              </label>
              <select
                className="premium-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Expiration
              </label>
              <input
                type="datetime-local"
                className="premium-input"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
              />
            </div>
          </div>

          <Button className="h-12 rounded-2xl bg-rose-600 px-6 text-sm font-semibold text-white hover:bg-rose-700">
            Send alert
          </Button>
        </form>

        <aside className="page-section">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
            Best Practice
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900">
            Keep alerts decisive
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Alerts work best when they state the situation, next action, and time sensitivity in the first sentence. Reserve high priority for messages that truly need urgency.
          </p>
        </aside>
      </section>
      )}
    </AdminShell>
  );
}

export default CreateAlert;
