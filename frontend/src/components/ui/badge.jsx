export function Badge({ children, className = "", variant = "secondary" }) {
  let colorClass = "bg-blue-500 text-white";
  if (variant === "destructive") colorClass = "bg-red-600 text-white";
  if (variant === "background") colorClass = "bg-gray-400 text-white";
  return (
    <span className={`${colorClass} px-2 py-1 rounded text-xs ${className}`}>
      {children}
    </span>
  );
}