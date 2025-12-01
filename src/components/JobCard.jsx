import { Link } from "react-router-dom";
import {
  BuildingOfficeIcon,
  MapPinIcon,
  BriefcaseIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/outline";

export default function JobCard({ job, onApply, onStatusChange }) {
  const {
    _id,
    title,
    company,
    location,
    jobType,
    experience,
    salary,
    applicationStatus,
    applied,
    jobUrl,
  } = job;

  const statusStyles = {
    in_review: "bg-yellow-100 text-yellow-700 border-yellow-300",
    selected: "bg-green-100 text-green-700 border-green-300",
    rejected: "bg-red-100 text-red-700 border-red-300",
    not_applied: "bg-gray-100 text-gray-700 border-gray-300",
  };

  const getIconForStatus = (status) => {
    switch (status) {
      case "selected":
        return <CheckCircleIcon className="w-4 h-4" />;
      case "rejected":
        return <XCircleIcon className="w-4 h-4" />;
      case "in_review":
        return <ClockIcon className="w-4 h-4" />;
      default:
        return <ArrowTrendingUpIcon className="w-4 h-4" />;
    }
  };

  const handleApplyClick = () => {
    if (jobUrl) window.open(jobUrl, "_blank");
    onApply(_id);
  };

  const finalStatus = applied ? applicationStatus : "not_applied";

  return (
    <div className="w-full p-6 rounded-xl border bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all mb-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title || "Untitled Job"}</h3>

        <span
          className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${statusStyles[finalStatus]}`}
        >
          {getIconForStatus(finalStatus)}
          {finalStatus.replace("_", " ")}
        </span>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-gray-700 text-sm mb-4">

        <div className="flex items-center gap-2">
          <BuildingOfficeIcon className="w-5 h-5 text-gray-400" />
          <span><strong>Company:</strong> {company || "N/A"}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-gray-400" />
          <span><strong>Location:</strong> {location || "N/A"}</span>
        </div>

        <div className="flex items-center gap-2">
          <BriefcaseIcon className="w-5 h-5 text-gray-400" />
          <span><strong>Type:</strong> {jobType || "N/A"}</span>
        </div>

        <div className="flex items-center gap-2">
          <UserGroupIcon className="w-5 h-5 text-gray-400" />
          <span><strong>Experience:</strong> {experience || "N/A"}</span>
        </div>

        <div className="flex items-center gap-2 sm:col-span-2">
          <CurrencyRupeeIcon className="w-5 h-5 text-gray-400" />
          <span><strong>Salary:</strong> {salary || "N/A"}</span>
        </div>

      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-3">

        {/* APPLY */}
        {!applied && (
          <button
            onClick={handleApplyClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm hover:shadow transition"
          >
            Apply
          </button>
        )}

        {/* STATUS BUTTONS */}
        {applied && (
          <div className="flex gap-2 flex-wrap">

            <button
              onClick={() => onStatusChange(_id, "in_review")}
              className="px-3 py-1 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg text-xs font-medium hover:bg-yellow-200 transition"
            >
              In Review
            </button>

            <button
              onClick={() => onStatusChange(_id, "selected")}
              className="px-3 py-1 bg-green-100 text-green-700 border border-green-300 rounded-lg text-xs font-medium hover:bg-green-200 transition"
            >
              Selected
            </button>

            <button
              onClick={() => onStatusChange(_id, "rejected")}
              className="px-3 py-1 bg-red-100 text-red-700 border border-red-300 rounded-lg text-xs font-medium hover:bg-red-200 transition"
            >
              Rejected
            </button>

          </div>
        )}

        {/* DETAILS LINK */}
        <Link
          to={`/jobs/${_id}`}
          className="text-blue-600 font-medium hover:underline text-sm ml-auto"
        >
          View Details →
        </Link>

      </div>
    </div>
  );
}
