import api from "./axiosInstance";

// GET PROFILE
export const getProfile = async () => {
  try {
    const res = await api.get("/profile");
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Error loading profile" };
  }
};

// CREATE PROFILE (only once)
export const createProfile = async (data) => {
  try {
    const res = await api.post("/profile/create", data);
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Error creating profile" };
  }
};

// UPDATE PROFILE BASIC INFO
export const updateProfile = async (data) => {
  try {
    const res = await api.put("/profile/update", data);
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Error updating profile" };
  }
};

// EDUCATION — ADD OR UPDATE
export const saveEducation = async (payload) => {
  // payload must contain:
  // { mode: "add" | "update", eduId?: "", school, degree, start, end }
  try {
    const res = await api.post("/profile/education", payload);
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Education error" };
  }
};

// EDUCATION — DELETE
export const deleteEducation = async (eduId) => {
  try {
    const res = await api.delete(`/profile/education/${eduId}`);
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Error deleting education" };
  }
};

// EXPERIENCE — ADD OR UPDATE
export const saveExperience = async (payload) => {
  // payload must contain:
  // { mode: "add" | "update", expId?: "", title, company, start, end, description }
  try {
    const res = await api.post("/profile/experience", payload);
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Experience error" };
  }
};

// EXPERIENCE — DELETE
export const deleteExperience = async (expId) => {
  try {
    const res = await api.delete(`/profile/experience/${expId}`);
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Error deleting experience" };
  }
};
