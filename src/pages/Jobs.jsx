import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";

import JobFilterBar from "../components/JobFilterBar";
import JobCard from "../components/JobCard";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");    // "" = load ALL jobs

  const fetchJobs = async (selectedFilter = "") => {
    try {
      const url = selectedFilter
        ? `/jobs?filter=${selectedFilter}`
        : "/jobs";    // Load ALL jobs

      const res = await api.get(url);
      setJobs(res.data.jobs);
    } catch (err) {
      console.error("Fetch Jobs Error:", err);
    }
  };

  // Load jobs when filter changes OR on first page load
  useEffect(() => {
    fetchJobs(filter);
  }, [filter]);

  const handleApply = async (jobId) => {
    await api.post(`/jobs/apply/${jobId}`);
    fetchJobs(filter);
  };

  const handleStatusChange = async (jobId, status) => {
    await api.patch(`/jobs/status/${jobId}`, { status });
    fetchJobs(filter);
  };

  return (
    <div className="jobs-page">

      <JobFilterBar selected={filter} onChange={setFilter} />

      <div className="jobs-list">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onApply={handleApply}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

    </div>
  );
}
