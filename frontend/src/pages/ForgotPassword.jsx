import { useState } from "react";
import { Loader2 } from "lucide-react";
import { API_BASE_URL } from "../config";
import API from "../services/api";
import AuthForm from "../components/AuthForm";
import { Button } from "@/components/ui/button";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    window.open(`${API_BASE_URL}/auth/google`, "_self");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Enter your email address.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await API.post("/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (submitError) {
      console.error(submitError);
      setError(submitError?.response?.data?.message || "Unable to send reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      badge="Password Help"
      title="Forgot your password?"
      description="Enter your email address and we will send you a reset link."
      googleLabel="Use Google instead"
      onGoogle={handleGoogleLogin}
      footerText="Remembered your password?"
      footerLinkLabel="Back to login"
      footerLinkTo="/login"
    >
      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {message ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {message}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            className="premium-input"
            placeholder="you@college.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button className="h-12 w-full rounded-2xl" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" size={16} /> : "Send reset link"}
        </Button>
      </form>
    </AuthForm>
  );
}

export default ForgotPassword;
