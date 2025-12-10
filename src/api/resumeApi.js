import api from "./axiosInstance";

// Updated to accept ONLY jobDescription
export const compareResume = async (jobDescription) => {
  const res = await api.post("/ai/compare-resume", {
    // The backend expects exactly this key
    jobDescription: jobDescription, 
  });
  return res.data;
};