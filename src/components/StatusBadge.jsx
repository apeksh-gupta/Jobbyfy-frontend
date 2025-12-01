export default function StatusBadge({ status }) {
  return <span className={`job-status ${status}`}>{status}</span>;
}
