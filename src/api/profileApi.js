import api from "./axiosInstance.js";

// Detect extension sidebar mode
const isExtension =
  typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.id;

// Helper to proxy API through background.js
const sendViaExtension = (payload) => {
  return new Promise((resolve) => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const token = auth?.token;

    chrome.runtime.sendMessage(
      {
        ...payload,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      },
      (res) => {
        if (!res) return resolve({ error: "No response from extension" });
        if (res.success) return resolve(res.data);
        resolve({ error: res.error || "Request failed" });
      }
    );
  });
};

// BASE URL for extension fetch
const BASE_URL = "http://localhost:5000/api/profile";

/* ----------------------------------------------------
   GET PROFILE
---------------------------------------------------- */
export const getProfile = async () => {
  if (isExtension) {
    return sendViaExtension({
      type: "API_REQUEST",
      url: `${BASE_URL}`,
      method: "GET",
    });
  }

  try {
    const res = await api.get("/profile");
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Error loading profile" };
  }
};

/* ----------------------------------------------------
   CREATE PROFILE
---------------------------------------------------- */
export const createProfile = async (data) => {
  if (isExtension) {
    return sendViaExtension({
      type: "API_REQUEST",
      url: `${BASE_URL}/create`,
      method: "POST",
      body: data,
    });
  }

  try {
    const res = await api.post("/profile/create", data);
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Error creating profile" };
  }
};

/* ----------------------------------------------------
   UPDATE PROFILE
---------------------------------------------------- */
export const updateProfile = async (data) => {
  if (isExtension) {
    return sendViaExtension({
      type: "API_REQUEST",
      url: `${BASE_URL}/update`,
      method: "PUT",
      body: data,
    });
  }

  try {
    const res = await api.put("/profile/update", data);
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Error updating profile" };
  }
};

/* ----------------------------------------------------
   EDUCATION — ADD / UPDATE
---------------------------------------------------- */
export const saveEducation = async (payload) => {
  if (isExtension) {
    return sendViaExtension({
      type: "API_REQUEST",
      url: `${BASE_URL}/education`,
      method: "POST",
      body: payload,
    });
  }

  try {
    const res = await api.post("/profile/education", payload);
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Education error" };
  }
};

/* ----------------------------------------------------
   EDUCATION — DELETE
---------------------------------------------------- */
export const deleteEducation = async (eduId) => {
  if (isExtension) {
    return sendViaExtension({
      type: "API_REQUEST",
      url: `${BASE_URL}/education/${eduId}`,
      method: "DELETE",
    });
  }

  try {
    const res = await api.delete(`/profile/education/${eduId}`);
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Error deleting education" };
  }
};

/* ----------------------------------------------------
   EXPERIENCE — ADD / UPDATE
---------------------------------------------------- */
export const saveExperience = async (payload) => {
  if (isExtension) {
    return sendViaExtension({
      type: "API_REQUEST",
      url: `${BASE_URL}/experience`,
      method: "POST",
      body: payload,
    });
  }

  try {
    const res = await api.post("/profile/experience", payload);
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Experience error" };
  }
};

/* ----------------------------------------------------
   EXPERIENCE — DELETE
---------------------------------------------------- */
export const deleteExperience = async (expId) => {
  if (isExtension) {
    return sendViaExtension({
      type: "API_REQUEST",
      url: `${BASE_URL}/experience/${expId}`,
      method: "DELETE",
    });
  }

  try {
    const res = await api.delete(`/profile/experience/${expId}`);
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Error deleting experience" };
  }
};
