export default function SearchBar({ onSearch }) {
  return (
    <input
      placeholder="Search by name or category"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
