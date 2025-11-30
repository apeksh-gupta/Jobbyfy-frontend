import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || null
  );

  // Make loginUser return a Promise so it can be awaited
  const loginUser = (data) => {
    return new Promise((resolve) => {
      setAuth(data);
      localStorage.setItem("auth", JSON.stringify(data));
      resolve(true);
    });
  };

  const logoutUser = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
