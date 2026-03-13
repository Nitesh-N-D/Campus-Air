import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../services/api";
import { API_BASE_URL } from "../config";
import AuthForm from "../components/AuthForm";
import { Button } from "@/components/ui/button";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = searchParams.get("token");

  const handleGoogleLogin = () => {
    window.open(`${API_BASE_URL}/auth/google`, "_self");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError("Reset token is missing.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Enter and confirm your new password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await API.post("/auth/reset-password", {
        token,
        password,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 1200);
    } catch (submitError) {
      console.error(submitError);
      setError(submitError?.response?.data?.message || "Unable to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      badge="Reset Password"
      title="Choose a new password"
      description="Set a new password for your Campus Air account and return to the login screen."
      googleLabel="Use Google instead"
      onGoogle={handleGoogleLogin}
      footerText="Need to sign in instead?"
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
          <label className="mb-2 block text-sm font-medium text-slate-700">New password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="premium-input pr-12"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-slate-400"
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Confirm password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="premium-input"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <Button className="h-12 w-full rounded-2xl" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" size={16} /> : "Reset password"}
        </Button>
      </form>
    </AuthForm>
  );
}

export default ResetPassword;
