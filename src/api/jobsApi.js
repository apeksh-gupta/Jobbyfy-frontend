import api from "./axiosInstance";

// -------------------------------
// 1) Extract job using Gemini AI
// -------------------------------
export const extractJobApi = async (data) => {
  try {
    const res = await api.post("/jobs/extract", data);
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Job Extraction Error" };
  }
};

// -------------------------------
// 2) Fetch jobs (with filter)
// -------------------------------
export const getJobsApi = async (filter = "") => {
  try {
    const url = filter ? `/jobs?filter=${filter}` : "/jobs";
    const res = await api.get(url);
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Failed to fetch jobs" };
  }
};

// -------------------------------
// 3) Fetch single job
// -------------------------------
export const getSingleJobApi = async (jobId) => {
  try {
    const res = await api.get(`/jobs/${jobId}`);
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Failed to fetch job" };
  }
};

// -------------------------------
// 4) Apply to Job
// -------------------------------
export const applyJobApi = async (jobId) => {
  try {
    const res = await api.post(`/jobs/apply/${jobId}`);
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Failed to apply job" };
  }
};

// -------------------------------
// 5) Update job application status
// -------------------------------
export const updateJobStatusApi = async (jobId, status) => {
  try {
    const res = await api.patch(`/jobs/status/${jobId}`, { status });
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Status update failed" };
  }
};

// -------------------------------
// 6) Delete job
// -------------------------------
export const deleteJobApi = async (jobId) => {
  try {
    const res = await api.delete(`/jobs/${jobId}`);
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Delete job failed" };
  }
};
