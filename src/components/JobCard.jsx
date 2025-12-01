import { Link } from "react-router-dom";
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

  const getStatusColor = (status) => {
    switch (status) {
      case "in_review":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "selected":
        return "bg-green-100 text-green-700 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-300";
      case "not_applied":
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  // -----------------------
  // APPLY BUTTON HANDLER
  // -----------------------
  const handleApplyClick = () => {
    // 1️⃣ Open job link in new tab
    if (jobUrl) window.open(jobUrl, "_blank");

    // 2️⃣ Trigger parent API call
    onApply(_id);
  };

  return (
    <div className="w-full border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white mb-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {title || "Untitled Job"}
        </h3>

        <span
          className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
            applied ? applicationStatus : "not_applied"
          )}`}
        >
          {applied ? applicationStatus.replace("_", " ") : "Not Applied"}
        </span>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-600 space-y-1 mb-4">
        <p><strong>Company:</strong> {company || "N/A"}</p>
        <p><strong>Location:</strong> {location || "N/A"}</p>
        <p><strong>Type:</strong> {jobType || "N/A"}</p>
        <p><strong>Experience:</strong> {experience || "N/A"}</p>
        <p><strong>Salary:</strong> {salary || "N/A"}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-3">

        {/* APPLY BUTTON */}
        {!applied && (
          <button
            onClick={handleApplyClick}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition"
          >
            Apply
          </button>
        )}

        {/* STATUS BUTTONS */}
        {applied && (
          <div className="flex gap-2 flex-wrap">

            <button
              onClick={() => onStatusChange(_id, "in_review")}
              className="px-3 py-1 bg-yellow-100 text-yellow-700 border border-yellow-300 rounded-lg text-xs font-medium hover:bg-yellow-200 transition"
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
        <Link
        to={`/jobs/${_id}`}
        className="text-blue-600 font-medium hover:underline text-sm"
      >
        View Details →
      </Link>
      </div>

    </div>
  );
}
