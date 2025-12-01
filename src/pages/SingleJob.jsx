import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import { compareResume } from "../api/resumeApi";
import { useProfile } from "../context/ProfileContext";

import {
  BriefcaseIcon,
  CurrencyRupeeIcon,
  UserGroupIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  RocketLaunchIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

export default function SingleJob() {
  const { jobId } = useParams();
  const { profile, loadingProfile } = useProfile();

  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);

  const [scoreLoading, setScoreLoading] = useState(false);
  const [scoreData, setScoreData] = useState(null);
  const [scoreError, setScoreError] = useState(null);

  // -----------------------------
  // FETCH JOB DETAILS
  // -----------------------------
  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${jobId}`);
      setJob(res.data.job);
    } catch (error) {
      console.error("Single Job Fetch Error:", error);
    } finally {
      setLoadingJob(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  // -----------------------------
  // RESUME SCORE HANDLER
  // -----------------------------
  const handleScore = async () => {
    setScoreLoading(true);
    setScoreError(null);

    try {
      if (loadingProfile) {
        setScoreError("Loading your profile...");
        setScoreLoading(false);
        return;
      }

      if (!profile || !profile.resumeUrl) {
        setScoreError("No resume found in your profile. Please upload one.");
        setScoreLoading(false);
        return;
      }

      const result = await compareResume(profile.resumeUrl, job.description);
      setScoreData(result);

    } catch (err) {
      console.log(err);
      setScoreError("Failed to score resume. Try again.");
    }

    setScoreLoading(false);
  };

  // -----------------------------
  // LOADING STATES
  // -----------------------------
  if (loadingJob) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="h-10 bg-gray-200 rounded animate-pulse w-1/2 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3 mb-6"></div>
        <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <p className="text-center mt-12 text-gray-500">
        Unable to load job details.
      </p>
    );
  }

  // -----------------------------
  // MAIN UI
  // -----------------------------
  return (
    <div className="min-h-screen bg-gray-50 pb-16">

      {/* Sticky Header */}
      <div className="sticky top-0 bg-white border-b shadow-sm py-4 mb-6 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-semibold text-gray-900">{job.title}</h1>

          <a
            href={job.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <RocketLaunchIcon className="w-5 h-5" />
            Apply on Website
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">

        {/* Company Info Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{job.title}</h2>

          <div className="mt-2 flex flex-col sm:flex-row gap-2 text-gray-700">
            <span className="flex items-center gap-2">
              <BuildingOfficeIcon className="w-5 h-5 text-gray-400" />
              {job.company}
            </span>

            <span className="hidden sm:block">•</span>

            <span className="flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-gray-400" />
              {job.location}
            </span>
          </div>
        </div>

        {/* Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-white rounded-xl border shadow-sm">
            <p className="text-gray-500 text-sm">Job Type</p>
            <div className="flex items-center gap-2 mt-1 font-medium">
              <BriefcaseIcon className="w-5 h-5 text-blue-500" />
              {job.jobType}
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border shadow-sm">
            <p className="text-gray-500 text-sm">Experience</p>
            <div className="flex items-center gap-2 mt-1 font-medium">
              <UserGroupIcon className="w-5 h-5 text-blue-500" />
              {job.experience}
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border shadow-sm">
            <p className="text-gray-500 text-sm">Salary</p>
            <div className="flex items-center gap-2 mt-1 font-medium">
              <CurrencyRupeeIcon className="w-5 h-5 text-blue-500" />
              {job.salary}
            </div>
          </div>
        </div>

        {/* Skills */}
        {job.skills?.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Job Description */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-3">Job Description</h3>
          <p className="leading-relaxed text-gray-700 whitespace-pre-line">
            {job.description}
          </p>
        </div>

        {/* Resume Score Button */}
        <button
          onClick={handleScore}
          className="px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Check Resume Match Score
        </button>

        {/* Error */}
        {scoreError && (
          <p className="mt-4 text-red-600">{scoreError}</p>
        )}

        {/* Loading */}
        {scoreLoading && (
          <div className="mt-6">
            <p className="text-gray-600">Analyzing your resume...</p>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mt-2">
              <div className="h-full w-1/2 bg-purple-500 animate-pulse"></div>
            </div>
          </div>
        )}

        {/* Score Result */}
        {scoreData && (
          <div className="mt-8 bg-white p-6 border rounded-xl shadow">

            <h3 className="text-2xl font-semibold">Resume Match Score</h3>
            <p className="text-4xl font-bold text-purple-600 mt-2">
              {scoreData.resumeScore} / 100
            </p>

            <div className="mt-6">
              <h4 className="font-semibold">Matched Skills</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {scoreData.matchedSkills.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full">{s}</span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold">Missing Skills</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {scoreData.missingSkills.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full">{s}</span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold">Recommendations</h4>
              <p className="text-gray-700">{scoreData.recommendations}</p>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold">Overall Summary</h4>
              <p className="text-gray-700">{scoreData.overallSummary}</p>
            </div>

          </div>
        )}

        {/* Application info */}
        <div className="bg-white border rounded-xl p-4 shadow-sm mt-10">
          <h3 className="text-lg font-semibold mb-3">Application Details</h3>

          <div className="space-y-2 text-gray-700 text-sm">
            <p>
              <strong>Status:</strong> {job.applicationStatus}
            </p>

            {job.appliedAt && (
              <p className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-gray-400" />
                <strong>Applied:</strong> {new Date(job.appliedAt).toLocaleString()}
              </p>
            )}

            <p><strong>Source:</strong> {job.source || "N/A"}</p>
          </div>
        </div>

        <div className="h-10"></div>
      </div>
    </div>
  );
}
