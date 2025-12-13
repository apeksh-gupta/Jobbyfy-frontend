import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext"; 
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Squares2X2Icon,
  DocumentMagnifyingGlassIcon,
  RocketLaunchIcon,
  BookmarkIcon,
  UserCircleIcon,
  ClipboardDocumentCheckIcon,
  PencilSquareIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [jobData, setJobData] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null); // ✅ Status state
  const { auth, logoutUser } = useAuth();
  const { profile, loadingProfile } = useProfile();


  useEffect(() => {
  console.log("🔍 Sidebar auth =", auth);
  console.log("🔍 Sidebar profile =", profile);
  console.log("🔍 Sidebar loadingProfile =", loadingProfile);
}, [auth, profile, loadingProfile]);


  if (!auth?.token) return <Navigate to="/login" />;

  // ✅ Listen for background status updates
  useEffect(() => {
    function handleMessage(e) {
      const { type, status } = e.data || {};

      if (type === "AUTO_APPLY_STATUS_UPDATE") {
        setStatusMessage(status); // e.g., "Scanning...", "Filling..."
      }

      if (type === "FILL_FAILED") {
        setStatusMessage("❌ Fill failed. Please try again.");
      }

      if (type === "FILL_SUCCESS") {
        setStatusMessage("✅ Form filled successfully!");
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const menu = [
    {
      label: "Scrape Current Job",
      desc: "Extract job details from the current tab.",
      icon: DocumentMagnifyingGlassIcon,
onClick: () => {
  console.log("DEBUG: Sending to extension", {
    userId: profile?._id,
    email: profile?.email,
    phone: profile?.mobile,
    token: auth?.token,
  });

window.top.postMessage(
  {
    type: "START_FILL_FROM_IFRAME",
    source: "DASHBOARD_IFRAME",
    profile: {
      userId: profile._id,             // ✅ this must exist
      name: profile.name,
      email: profile.email,
      phone: profile.mobile,
      resumeUrl: profile.resumeUrl
    }
  },
  "*"
);

}

    },
    {
      label: "Fill Current Form",
      desc: "Use AI to auto-fill the form on the current tab.",
      icon: RocketLaunchIcon,
      onClick: () => {
        console.log("📤 POSTING TO BRIDGE", {
  userId: profile._id,
});
        

window.top.postMessage(
  {
    type: "START_FILL_FROM_IFRAME",
    source: "DASHBOARD_IFRAME",
    profile: {
      userId: profile._id,             // ✅ this must exist
      name: profile.name,
      email: profile.email,
      phone: profile.mobile,
      resumeUrl: profile.resumeUrl
    }
  },
  "*"
);

      },
    },
    {
      label: "Saved Jobs",
      desc: "View all scraped and saved jobs.",
      icon: BookmarkIcon,
      link: "/jobs",
    },
    {
      label: "Profile",
      desc: "Edit your profile & details.",
      icon: UserCircleIcon,
      link: "/profile",
    },
    {
      label: "Resume Score",
      desc: "Check match score for your resume.",
      icon: ClipboardDocumentCheckIcon,
      onClick: () => {},
    },
    {
      label: "Cover Letter",
      desc: "Generate tailored cover letters.",
      icon: PencilSquareIcon,
      onClick: () => {},
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white border-r shadow-sm hidden md:flex flex-col p-6">
        <div className="flex items-center gap-2 mb-10">
          <Squares2X2Icon className="w-7 h-7 text-blue-600" />
          <h1 className="text-xl font-bold">Jobbyfy</h1>
        </div>

        <nav className="flex-1">
          <p className="text-sm text-gray-500 mb-2 px-3">MAIN</p>
          <ul className="space-y-1">
            {menu.map((item, i) => (
              <li key={i}>
                {item.link ? (
                  <Link
                    to={item.link}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg 
                      hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg 
                      hover:bg-blue-50 text-left text-gray-700 hover:text-blue-600 transition"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={logoutUser}
          className="mt-8 flex items-center gap-3 text-red-600 px-3 py-2 rounded-lg 
            hover:bg-red-50 transition"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        <header className="max-w-5xl mx-auto mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Welcome back,{" "}
              <span className="text-blue-600">{auth?.user?.name}</span> 👋
            </h2>
            <p className="text-gray-600 mt-1">
              Manage your job applications and profile easily.
            </p>
          </div>

          <button
            onClick={logoutUser}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow transition md:hidden"
          >
            Logout
          </button>
        </header>

        {/* ✅ STATUS FEEDBACK */}
        {statusMessage && (
          <div className="mb-6 max-w-5xl mx-auto px-4 py-3 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg shadow-sm">
            {statusMessage}
          </div>
        )}

        {/* FEATURE CARDS */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu.map((item, i) => {
            const Wrapper = item.link ? Link : "button";
            return (
              <Wrapper
                key={i}
                {...(item.link ? { to: item.link } : { onClick: item.onClick })}
                className="group p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition 
                  hover:-translate-y-1 hover:border-blue-300"
              >
                <item.icon className="w-10 h-10 text-blue-600 mb-4 group-hover:scale-110 transition" />
                <h3 className="text-lg font-semibold mb-1">{item.label}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
                <span className="text-blue-600 font-bold opacity-0 group-hover:opacity-100 transition">
                  →
                </span>
              </Wrapper>
            );
          })}
        </div>
      </main>
    </div>
  );
}
