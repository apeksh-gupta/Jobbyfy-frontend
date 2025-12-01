import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";

import JobFilterBar from "../components/JobFilterBar";
import JobCard from "../components/JobCard";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchJobs = async (selectedFilter = "") => {
    try {
      setLoading(true);
      const url = selectedFilter ? `/jobs?filter=${selectedFilter}` : "/jobs";
      const res = await api.get(url);
      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error("Fetch Jobs Error:", err);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="min-h-screen bg-gray-50 px-4 py-8">

      {/* Page Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Your Jobs
        </h1>
        <p className="text-gray-600 mt-1">
          Track your saved, applied, and reviewed job applications.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="max-w-5xl mx-auto mb-6">
        <JobFilterBar selected={filter} onChange={setFilter} />
      </div>

      {/* Jobs List */}
      <div className="max-w-5xl mx-auto">

        {/* Loading shimmer */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full h-32 bg-gray-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && jobs.length === 0 && (
          <div className="text-center py-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486766.png"
              alt="No Jobs"
              className="w-24 mx-auto opacity-60 mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              No jobs found
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Try adjusting the filter or scrape more jobs.
            </p>
          </div>
        )}

        {/* Jobs List */}
        {!loading && jobs.length > 0 && (
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onApply={handleApply}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
