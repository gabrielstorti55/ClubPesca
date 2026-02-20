export function Badge({ children, className = ""}) {
  return (
    <span className={`bg-blue-500 text-white px-2 py-1 rounded text-xs ${className}`}>
      {children}
    </span>
  );
}