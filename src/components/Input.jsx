export default function Input({ label, value, onChange, type = "text", ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        {...props}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </div>
  );
}
