import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { API_BASE_URL } from "../config";
import AuthForm from "../components/AuthForm";
import { Button } from "@/components/ui/button";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    window.open(`${API_BASE_URL}/auth/google`, "_self");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("Fill in all fields before creating your account.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await API.post("/auth/signup", form);
      setSuccess(res.data.message);
      setTimeout(() => navigate("/login"), 1200);
    } catch (submitError) {
      console.error(submitError);
      setError(submitError?.response?.data?.message || "Unable to create your account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      badge="Create Account"
      title="Start with Campus Air"
      description="Create a modern campus workspace account with email/password or continue with Google."
      googleLabel="Sign up with Google"
      onGoogle={handleGoogleLogin}
      footerText="Already have an account?"
      footerLinkLabel="Login"
      footerLinkTo="/login"
    >
      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
          <input
            type="text"
            className="premium-input"
            placeholder="Nitesh D"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            className="premium-input"
            placeholder="you@college.edu"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="premium-input pr-12"
              placeholder="Minimum 8 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
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

        <Button className="h-12 w-full rounded-2xl" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" size={16} /> : "Create account"}
        </Button>
      </form>
    </AuthForm>
  );
}

export default Signup;
