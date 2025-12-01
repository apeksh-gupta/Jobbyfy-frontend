import api from "./axiosInstance";

export const compareResume = async (resumeUrl, jobDescription) => {
  const res = await api.post("/ai/compare-resume", {
    resumeUrl,
    jobDescription,
  });
  return res.data;
};
