import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";

export default function SingleJob() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${jobId}`);
      setJob(res.data.job);
    } catch (error) {
      console.error("Single Job Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  if (!job) {
    return <p className="text-center mt-8 text-gray-500">Loading job...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Title & Company */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
        <p className="text-lg text-gray-700">{job.company}</p>
        <p className="text-gray-500">{job.location}</p>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">

        <div className="p-4 bg-gray-50 rounded-lg border">
          <p className="text-gray-500 text-sm">Job Type</p>
          <p className="font-medium">{job.jobType}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border">
          <p className="text-gray-500 text-sm">Experience</p>
          <p className="font-medium">{job.experience}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border">
          <p className="text-gray-500 text-sm">Salary</p>
          <p className="font-medium">{job.salary}</p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Required Skills</h2>
        <div className="flex flex-wrap gap-2">
          {job.skills?.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Job Description</h2>
        <p className="whitespace-pre-line text-gray-700 leading-relaxed">
          {job.description}
        </p>
      </div>

      {/* Open Job Link */}
      <a
        href={job.jobUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
      >
        Apply on Website →
      </a>

      {/* Status Info */}
      <div className="mt-6 text-sm text-gray-600">
        <p><strong>Status:</strong> {job.applicationStatus}</p>
        {job.appliedAt && <p><strong>Applied At:</strong> {new Date(job.appliedAt).toLocaleString()}</p>}
        <p><strong>Source:</strong> {job.source}</p>
      </div>

    </div>
  );
}
