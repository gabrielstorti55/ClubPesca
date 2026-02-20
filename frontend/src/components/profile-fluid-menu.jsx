import { User } from "lucide-react";

export function ProfileFluidMenu() {
  return (
    <div className="relative flex items-center">
      <div
        className="relative w-10 h-10 cursor-pointer select-none"
        onClick={() => window.location.href = "/profile"}
        tabIndex={0}
        aria-label="Abrir perfil"
      >
        <User size={32} strokeWidth={1.5} />
      </div>
    </div>
  );
}
