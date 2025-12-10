import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import { compareResume } from "../api/resumeApi"; // Ensure this is the updated version
import { useProfile } from "../context/ProfileContext";

import {
  BriefcaseIcon,
  CurrencyRupeeIcon,
  UserGroupIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  RocketLaunchIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  LightBulbIcon,
  ChartBarIcon
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

      // Check if user has a resume linked in their profile
      if (!profile || !profile.resumeUrl) {
        setScoreError("No resume found. Please go to Profile and link your Google Drive resume.");
        setScoreLoading(false);
        return;
      }

      // ------------------------------------------------------
      // FIX: Pass ONLY job description.
      // The backend gets the resumeUrl from the User DB.
      // ------------------------------------------------------
      const result = await compareResume(job.description);
      
      setScoreData(result);

    } catch (err) {
      console.error(err);
      // Handle the 404 specifically if resume is missing in backend
      if (err.response && err.response.status === 404) {
         setScoreError("Resume not found in database. Please re-upload in Profile.");
      } else {
         setScoreError("Failed to analyze resume. Please try again.");
      }
    }

    setScoreLoading(false);
  };

  // -----------------------------
  // HELPER: Score Color
  // -----------------------------
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 50) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  // -----------------------------
  // LOADING STATE
  // -----------------------------
  if (loadingJob) {
    return (
      <div className="max-w-4xl mx-auto p-6 min-h-screen">
        <div className="h-10 bg-gray-200 rounded animate-pulse w-1/2 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3 mb-6"></div>
        <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Unable to load job details.</p>
      </div>
    );
  }

  // -----------------------------
  // MAIN UI
  // -----------------------------
  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* STICKY HEADER */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-900 truncate max-w-xs sm:max-w-md">
            {job.title}
          </h1>
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            <RocketLaunchIcon className="w-4 h-4" />
            <span>Apply Now</span>
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8">

        {/* JOB HEADER CARD */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{job.title}</h2>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm sm:text-base">
            <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-md">
              <BuildingOfficeIcon className="w-5 h-5 text-gray-500" />
              {job.company}
            </span>
            <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-md">
              <MapPinIcon className="w-5 h-5 text-gray-500" />
              {job.location}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
              <p className="text-blue-500 text-xs font-semibold uppercase tracking-wide">Job Type</p>
              <div className="flex items-center gap-2 mt-1 text-gray-900 font-medium">
                <BriefcaseIcon className="w-5 h-5 text-blue-600" />
                {job.jobType}
              </div>
            </div>

            <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100">
              <p className="text-purple-500 text-xs font-semibold uppercase tracking-wide">Experience</p>
              <div className="flex items-center gap-2 mt-1 text-gray-900 font-medium">
                <UserGroupIcon className="w-5 h-5 text-purple-600" />
                {job.experience}
              </div>
            </div>

            <div className="p-4 bg-green-50/50 rounded-xl border border-green-100">
              <p className="text-green-500 text-xs font-semibold uppercase tracking-wide">Salary</p>
              <div className="flex items-center gap-2 mt-1 text-gray-900 font-medium">
                <CurrencyRupeeIcon className="w-5 h-5 text-green-600" />
                {job.salary}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Job Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* SKILLS */}
            {job.skills?.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <LightBulbIcon className="w-5 h-5 text-yellow-500" />
                  Required Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* DESCRIPTION */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Job Description</h3>
              <div className="prose prose-blue max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
                {job.description}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Resume Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* AI ANALYSIS CARD */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 ring-1 ring-purple-50">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <ChartBarIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">AI Resume Match</h3>
                </div>

                {!scoreData ? (
                  <div className="text-center py-6">
                    <p className="text-gray-500 text-sm mb-6">
                      Check how well your resume matches this job description using AI.
                    </p>
                    
                    <button
                      onClick={handleScore}
                      disabled={scoreLoading}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                      {scoreLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Check Match Score"
                      )}
                    </button>
                    
                    {scoreError && (
                      <p className="mt-3 text-red-500 text-xs bg-red-50 p-2 rounded border border-red-100">
                        {scoreError}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* SCORE CIRCLE */}
                    <div className="flex flex-col items-center justify-center mb-6">
                      <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 text-3xl font-bold ${getScoreColor(scoreData.resumeScore)}`}>
                        {scoreData.resumeScore}%
                      </div>
                      <p className="text-xs text-gray-400 mt-2 font-medium uppercase tracking-wider">Match Score</p>
                    </div>

                    {/* KEYWORDS ANALYSIS */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Matched Skills</p>
                        <div className="flex flex-wrap gap-1.5">
                          {scoreData.matchedSkills?.length > 0 ? (
                            scoreData.matchedSkills.map((s, i) => (
                              <span key={i} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded border border-green-100 flex items-center gap-1">
                                <CheckCircleIcon className="w-3 h-3" /> {s}
                              </span>
                            ))
                          ) : <span className="text-gray-400 text-xs italic">No direct matches found</span>}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Missing Keywords</p>
                        <div className="flex flex-wrap gap-1.5">
                          {scoreData.missingSkills?.length > 0 ? (
                            scoreData.missingSkills.map((s, i) => (
                              <span key={i} className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded border border-red-100 flex items-center gap-1">
                                <XCircleIcon className="w-3 h-3" /> {s}
                              </span>
                            ))
                          ) : <span className="text-green-600 text-xs">Great job! No key skills missing.</span>}
                        </div>
                      </div>
                    </div>

                    {/* SUMMARY */}
                    <div className="mt-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-700 italic">"{scoreData.overallSummary}"</p>
                    </div>

                    {/* RETRY BUTTON */}
                    <button
                      onClick={handleScore}
                      className="w-full mt-4 py-2 text-sm text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
                    >
                      Re-analyze Resume
                    </button>
                  </div>
                )}
              </div>

              {/* APPLICATION INFO MINI-CARD */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-sm text-gray-600">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-2">
                  <span>Status</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    job.applicationStatus === 'Applied' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {job.applicationStatus}
                  </span>
                </div>
                {job.appliedAt && (
                  <div className="flex justify-between items-center">
                    <span>Applied Date</span>
                    <span>{new Date(job.appliedAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}