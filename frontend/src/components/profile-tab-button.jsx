export default function ProfileTabButton({ active, onClick, children }) {
  return (
    <button
      className={`px-4 py-2 rounded-t-md font-semibold transition border-b-2 ${
        active
          ? "border-blue-600 text-blue-900 bg-white"
          : "border-transparent text-blue-700 bg-blue-100 hover:bg-blue-200"
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
