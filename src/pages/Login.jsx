import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  /* 🔁 Redirect if already logged in */
  useEffect(() => {
    const token =
      localStorage.getItem("user_token") ||
      sessionStorage.getItem("user_token");

    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  /* 🔁 Load remembered email only */
  useEffect(() => {
    const remembered = localStorage.getItem("remember_email") === "true";

    if (remembered) {
      setEmail(localStorage.getItem("remembered_email") || "");
      setRemember(true);
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://quizbackend-production-a1ec.up.railway.app/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }

      /* ✅ CHOOSE STORAGE BASED ON REMEMBER */
      const storage = remember ? localStorage : sessionStorage;

      /* 🧹 Clear both first (IMPORTANT) */
      localStorage.removeItem("user_token");
      sessionStorage.removeItem("user_token");

      /* 🔐 Save auth data */
      storage.setItem("user_token", data.token);
      storage.setItem("user_role", data.user.role);
      storage.setItem("user_name", data.user.fullname);
      storage.setItem("user_email", data.user.email);

      /* 💾 Remember email only */
      if (remember) {
        localStorage.setItem("remembered_email", email);
        localStorage.setItem("remember_email", "true");
      } else {
        localStorage.removeItem("remembered_email");
        localStorage.removeItem("remember_email");
      }

      toast.success(`Welcome back ${data.user.fullname} 🚀`);

      /* 🔁 Redirect */
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });

    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-950 to-blue-900 px-4">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="relative w-full max-w-md">

        {/* CARD */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.7)]">

          {/* HEADER */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-white">
              Welcome Back 👋
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Login to continue your journey
            </p>
          </div>

          <form onSubmit={submit} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
                w-full px-4 py-2.5 rounded-xl
                bg-white/5 border border-white/10
                text-white placeholder:text-slate-500
                focus:outline-none focus:border-indigo-400 focus:bg-white/10
                transition
              "
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="
                  w-full px-4 py-2.5 rounded-xl
                  bg-white/5 border border-white/10
                  text-white placeholder:text-slate-500
                  focus:outline-none focus:border-indigo-400 focus:bg-white/10
                  transition
                "
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-white"
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            {/* OPTIONS */}
            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-indigo-500"
                />
                Remember me
              </label>

              <span
                onClick={() => navigate("/forgot-password")}
                className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
              >
                Forgot?
              </span>
            </div>

            {/* ERROR */}
            {error && (
              <div className="text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="
              w-full py-3 rounded-xl font-semibold
              bg-gradient-to-r from-indigo-500 to-blue-500
              hover:scale-[1.02] active:scale-95
              transition-all duration-200
              shadow-lg hover:shadow-indigo-500/30
            "
            >
              Login →
            </button>

            {/* REGISTER */}
            <div className="text-center text-sm text-slate-400">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
              >
                Register
              </span>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
