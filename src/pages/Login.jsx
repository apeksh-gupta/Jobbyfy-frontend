import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../api/authApi";
import { getProfile, createProfile } from "../api/profileApi";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await loginApi(form);

    if (res.token && res.user) {
        await loginUser({
          token: res.token,
          user: res.user,
        });



      // STEP 3: Wait for token to be picked up by axios interceptors
      await new Promise((resolve) => setTimeout(resolve, 50));

      // STEP 4: Check if profile exists
      const check = await getProfile();

      if (!check.profile) {
        await createProfile({
          userId: res.user.userId,
          name: res.user.name,
          email: res.user.email,
        });
      }

      // STEP 5: Navigate
      navigate("/dashboard");
    } else {
      alert(res.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Jobbyfy
        </h1>

        <h2 className="text-xl font-semibold mb-6 text-center">
          Welcome Back
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-300"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-300"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-center text-sm">
            New to Jobbyfy?{" "}
            <Link className="text-blue-600 font-medium" to="/signup">
              Create account
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}
