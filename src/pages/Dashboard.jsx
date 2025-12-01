import { useAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

export default function Dashboard() {
  console.log("DASHBOARD MOUNTED");

  const { auth, logoutUser } = useAuth();

  // PROTECT ROUTE
  if (!auth?.token) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, <span className="text-blue-600">{auth?.user?.name}</span> 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your job applications and profile easily.
        </p>
      </div>

      {/* ACTION CARDS */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* SCRAPE JOB */}
        <button
          onClick={() => {
            console.log("STEP 1: Scrape button clicked in Dashboard");
            console.log("STEP 2: Sending SCRAPE_JOB_REQUEST_FROM_DASHBOARD to TOP window");

            window.top.postMessage(
              { type: "SCRAPE_JOB_REQUEST_FROM_DASHBOARD", source: "DASHBOARD_IFRAME" },
              "*"
            );
          }}
          className="p-6 bg-white shadow hover:shadow-md rounded-xl border text-left transition"
        >
          <h2 className="text-xl font-semibold mb-2">Scrape Current Job</h2>
          <p className="text-gray-600 mb-3">Extract job details from the current tab.</p>
          <span className="text-blue-600 font-semibold">→</span>
        </button>

        {/* AUTO APPLY */}
        <button className="p-6 bg-white shadow hover:shadow-md rounded-xl border text-left transition">
          <h2 className="text-xl font-semibold mb-2">Auto Apply</h2>
          <p className="text-gray-600 mb-3">Automatically fill job applications.</p>
          <span className="text-blue-600 font-semibold">→</span>
        </button>

        {/* SAVED JOBS */}
          <Link
            to="/jobs"
            className="p-6 bg-white shadow hover:shadow-md rounded-xl border text-left transition block"
          >
            <h2 className="text-xl font-semibold mb-2">Saved Jobs</h2>
            <p className="text-gray-600 mb-3">View all scraped and saved jobs.</p>
            <span className="text-blue-600 font-semibold">→</span>
          </Link>


        {/* PROFILE */}
        <Link
          to="/profile"
          className="p-6 bg-white shadow hover:shadow-md rounded-xl border text-left transition block"
        >
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p className="text-gray-600 mb-3">Edit your profile & details.</p>
          <span className="text-blue-600 font-semibold">→</span>
        </Link>

        {/* RESUME SCORE */}
        <button className="p-6 bg-white shadow hover:shadow-md rounded-xl border text-left transition">
          <h2 className="text-xl font-semibold mb-2">Resume Score</h2>
          <p className="text-gray-600 mb-3">Check resume match score for job.</p>
          <span className="text-blue-600 font-semibold">→</span>
        </button>

        {/* COVER LETTER */}
        <button className="p-6 bg-white shadow hover:shadow-md rounded-xl border text-left transition">
          <h2 className="text-xl font-semibold mb-2">Cover Letter</h2>
          <p className="text-gray-600 mb-3">Generate tailored cover letters.</p>
          <span className="text-blue-600 font-semibold">→</span>
        </button>

        {/* LOGOUT */}
        <button
          onClick={logoutUser}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
