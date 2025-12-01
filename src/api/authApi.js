import api from "./axiosInstance.js";

// Detect if running inside Chrome Extension sidebar
const isExtension =
  typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.id;

// Helper for extension background message (includes correct headers)
const sendViaExtension = (payload) => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      {
        ...payload,
        headers: {
          "Content-Type": "application/json",
          // DO NOT ADD Authorization here (login/signup don’t need token)
        },
      },
      (res) => {
        if (!res) return resolve({ message: "No response from extension" });
        if (res.success) return resolve(res.data);
        resolve({ message: res.error || "Request failed" });
      }
    );
  });
};

// -----------------------------------------------------
// LOGIN API
// -----------------------------------------------------
export const loginApi = async (data) => {
  if (isExtension) {
    return sendViaExtension({
      type: "API_REQUEST",
      url: "http://localhost:5000/api/auth/login",
      method: "POST",
      body: data,
    });
  }

  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Login Error" };
  }
};

// -----------------------------------------------------
// SIGNUP API
// -----------------------------------------------------
export const signupApi = async (data) => {
  if (isExtension) {
    return sendViaExtension({
      type: "API_REQUEST",
      url: "http://localhost:5000/api/auth/signup",
      method: "POST",
      body: data,
    });
  }

  try {
    const res = await api.post("/auth/signup", data);
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Signup Error" };
  }
};
