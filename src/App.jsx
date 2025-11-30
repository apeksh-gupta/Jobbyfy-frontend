import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { auth } = useAuth();   // auth = { token, user }

  const isLoggedIn = Boolean(auth?.token);

  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Login />
          }
        />

        <Route
          path="/signup"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/profile"
          element={
            isLoggedIn ? <Profile /> : <Navigate to="/login" />
          }
        />

        {/* DEFAULT ROUTE */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        {/* ANY UNKNOWN ROUTE */}
        <Route
          path="*"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

      </Routes>
    </Router>
  );
}
