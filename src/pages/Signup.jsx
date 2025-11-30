import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupApi } from "../api/authApi";
import { createProfile } from "../api/profileApi";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await signupApi(form);

    // SUCCESSFUL SIGNUP
    if (res.token && res.user) {
      // STEP 1: Save auth data (token + user) in context AND localStorage
      await loginUser({
        token: res.token,
        user: res.user,
      });


      // STEP 3: Wait a tick so axios interceptor can read updated token
      await new Promise((resolve) => setTimeout(resolve, 50));

      // STEP 4: Create user profile (name & email only)
      await createProfile({
        userId: res.user.userId,
        name: res.user.name,
        email: res.user.email,
      });

      // STEP 5: Redirect to dashboard
      navigate("/dashboard");
    } else {
      alert(res.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Jobbyfy
        </h1>

        <h2 className="text-xl font-semibold mb-6 text-center">
          Create Your Account
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-300"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="John Doe"
            />
          </div>

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
            Sign Up
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link className="text-blue-600 font-medium" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
