export default function JobFilterBar({ selected, onChange }) {
  const filters = [
    { key: "", label: "All" },
    { key: "applied", label: "Applied" },
    { key: "not_applied", label: "Not Applied" },
    { key: "in_review", label: "In Review" },
    { key: "selected", label: "Selected" },
    { key: "rejected", label: "Rejected" },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {filters.map((f) => {
        const active = selected === f.key;

        return (
          <button
            key={f.key}
            onClick={() => onChange(f.key)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition
              border 
              ${active 
                ? "bg-blue-600 text-white border-blue-600 shadow-md" 
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }
            `}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
