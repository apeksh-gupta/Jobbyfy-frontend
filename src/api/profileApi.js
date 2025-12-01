import api from "./axiosInstance";

/**
 * GET FULL PROFILE
 * Called once by ProfileContext when the app loads.
 */
export const getProfile = async () => {
  try {
    const res = await api.get("/profile");
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Error loading profile" };
  }
};

/**
 * CREATE PROFILE — only used once if profile does not exist.
 */
export const createProfile = async (data) => {
  try {
    const res = await api.post("/profile/create", data);
    return res.data;
  } catch (err) {
    return err.response?.data || { error: "Error creating profile" };
  }
};

/**
 * UPDATE PROFILE — single API call used for:
 * ✔ Basic info update
 * ✔ Education update
 * ✔ Experience update
 * ✔ Resume URL update
 * ✔ Any profile field
 *
 * This replaces ALL old education/experience CRUD routes.
 */
export const updateProfile = async (data) => {
  try {
    const res = await api.put("/profile/update", data);
    return res.data;
  } catch (err) {
    console.error("Profile Update Error:", err.response?.data);
    return err.response?.data || { error: "Error updating profile" };
  }
};


// ❌ OLD APIs ARE REMOVED
// ❌ saveEducation
// ❌ deleteEducation
// ❌ saveExperience
// ❌ deleteExperience

// Keeping them would cause bugs and confusion.
