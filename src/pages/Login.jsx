import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../api/authApi";
import { getProfile, createProfile } from "../api/profileApi";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginApi(form);

      if (res.token && res.user) {
        // -----------------------------------------------------------
        // CRITICAL FIX: Match the "auth" naming convention!
        // Your Axios Interceptor looks for "auth", so we must save "auth".
        // -----------------------------------------------------------
        const authData = { token: res.token, user: res.user };
        localStorage.setItem("auth", JSON.stringify(authData)); 

        // Update Context (this also saves to LS, but the line above guarantees immediate availability)
        await loginUser(authData);

        // Small delay to ensure state updates
        await new Promise((resolve) => setTimeout(resolve, 50));

        // Now this request will work because "auth" exists in LocalStorage
        const check = await getProfile();

        // If profile doesn't exist, create it
        if (!check || !check.profile) {
          await createProfile({
            userId: res.user.userId,
            name: res.user.name,
            email: res.user.email,
          });
        }

        navigate("/dashboard");
      } else {
        alert(res.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Please check your connection.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-6 py-10">

      {/* Card */}
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl shadow-xl rounded-3xl p-8 border border-white/30">

        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Jobbyfy
          </h1>
          <p className="text-gray-600 mt-1 text-sm">Welcome back! Log in to continue.</p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-3 rounded-xl bg-white border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="john@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 rounded-xl bg-white border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg hover:opacity-95 transition-all"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Signup link */}
          <p className="text-center text-sm text-gray-700">
            New to Jobbyfy?
            <Link to="/signup" className="ml-1 font-semibold text-blue-600 hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
