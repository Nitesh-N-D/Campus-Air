import { useMemo, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import API from "../services/api";
import { API_BASE_URL } from "../config";
import AuthForm from "../components/AuthForm";
import { Button } from "@/components/ui/button";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const verifiedStatus = useMemo(() => searchParams.get("verified"), [searchParams]);

  const handleGoogleLogin = () => {
    window.open(`${API_BASE_URL}/auth/google`, "_self");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Enter both email and password.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("campus_air_token", res.data.token);
      navigate(location.state?.from || "/dashboard");
    } catch (submitError) {
      console.error(submitError);
      setError(submitError?.response?.data?.message || "Unable to sign in right now.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      badge="Secure Access"
      title="Sign in to your account"
      description="Use Google or your email and password to enter the Campus Air workspace."
      googleLabel="Sign in with Google"
      onGoogle={handleGoogleLogin}
      footerText="Don't have an account?"
      footerLinkLabel="Create one"
      footerLinkTo="/signup"
    >
      {verifiedStatus === "1" ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Email verified successfully. You can log in now.
        </div>
      ) : null}

      {verifiedStatus === "0" ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          Verification link is invalid or expired.
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
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

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <Link to="/forgot-password" className="text-sm font-medium text-teal-700 hover:text-teal-800">
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="premium-input pr-12"
              placeholder="Enter your password"
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

        <Button className="h-12 w-full rounded-2xl" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" size={16} /> : "Sign in with email"}
        </Button>
      </form>
    </AuthForm>
  );
}

export default Login;
