import { User, Shield } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export function ProfileFluidMenu() {
  const { user } = useAuth();
  
  return (
    <div className="relative flex items-center gap-4">
      {user?.role === "ADMIN" && (
        <button
          onClick={() => window.location.href = "/admin"}
          className="text-red-600 hover:text-red-700 flex items-center justify-center p-2 rounded-full hover:bg-red-50"
          title="Painel Admin"
        >
          <Shield size={24} strokeWidth={1.5} />
        </button>
      )}

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
