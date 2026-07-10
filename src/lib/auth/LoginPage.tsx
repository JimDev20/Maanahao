import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useLang } from "../LanguageContext";
import ScrollReveal from "../../components/ScrollReveal";

export default function LoginPage() {
  const { login } = useAuth();
  const { lang } = useLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(
        lang === "en"
          ? "Invalid email or password"
          : "Hindi tamang email o password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-neutral-50">
      <ScrollReveal>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="size-16 mx-auto rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg mb-4">
              <span className="text-center leading-none">
                BRGY
                <br />
                MN
              </span>
            </div>
            <h1 className="text-2xl font-bold text-neutral-900">
              {lang === "en" ? "Barangay Admin" : "Barangay Admin"}
            </h1>
            <p className="text-neutral-500 text-sm mt-1">
              {lang === "en"
                ? "Sign in to access the management dashboard"
                : "Mag-sign in para ma-access ang management dashboard"}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-5"
          >
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="admin@barangay.gov"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                {lang === "en" ? "Password" : "Password"}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="size-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  {lang === "en" ? "Signing in..." : "Nag-sign in..."}
                </>
              ) : (
                lang === "en"
                  ? "Sign In"
                  : "Mag-sign In"
              )}
            </button>
          </form>
        </div>
      </ScrollReveal>
    </div>
  );
}
