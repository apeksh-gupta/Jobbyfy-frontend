import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ArrowUpOnSquareIcon,
  DocumentCheckIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

export default function JobFilterBar({ selected, onChange }) {
  const filters = [
    { key: "", label: "All", icon: EyeIcon },
    { key: "applied", label: "Applied", icon: ArrowUpOnSquareIcon },
    { key: "not_applied", label: "Not Applied", icon: ClockIcon },
    { key: "in_review", label: "In Review", icon: DocumentCheckIcon },
    { key: "selected", label: "Selected", icon: CheckCircleIcon },
    { key: "rejected", label: "Rejected", icon: XCircleIcon },
  ];

  return (
    <div className="w-full mb-6 flex flex-wrap items-center gap-2 bg-white p-3 rounded-xl border shadow-sm">
      {filters.map((f) => {
        const active = selected === f.key;
        const Icon = f.icon;

        return (
          <button
            key={f.key}
            onClick={() => onChange(f.key)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-200 border
              ${
                active
                  ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                  : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100 hover:shadow"
              }
            `}
          >
            <Icon className="w-5 h-5" />
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
