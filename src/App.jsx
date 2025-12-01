import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";   // ✅ NEW IMPORT

import { useAuth } from "./context/AuthContext";
import { useEffect, useRef } from "react";
import api from "./api/axiosInstance";
import SingleJob from "./pages/SingleJob";

export default function App() {

  const { auth } = useAuth();
  const isLoggedIn = Boolean(auth?.token);

  const scrapingLock = useRef(false);

  useEffect(() => {
    const handler = async (event) => {
      if (event.data?.type === "SCRAPE_JOB_RESPONSE") {

        if (scrapingLock.current) {
          console.log("IFRAME: Scrape already in progress — ignoring");
          return;
        }

        scrapingLock.current = true;

        const scraped = event.data.payload;

        try {
          const res = await api.post("/jobs/extract", scraped);
          console.log("Job saved:", res.data.job);
        } catch (err) {
          console.error("Error:", err);
        }

        scrapingLock.current = false;
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);

  }, []);

  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />}
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />

        {/* ✅ NEW JOBS PAGE ROUTE */}
        <Route
          path="/jobs"
          element={isLoggedIn ? <Jobs /> : <Navigate to="/login" />}
        />
        <Route
          path="/jobs/:jobId"
          element={isLoggedIn ? <SingleJob /> : <Navigate to="/login" />}
        />

        {/* DEFAULT ROUTE */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />

      </Routes>
    </Router>
  );
}
