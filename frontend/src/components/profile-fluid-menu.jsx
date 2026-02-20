import React from "react";
import { Menu as MenuIcon, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProfileFluidMenu({ user, onLogout }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="relative flex items-center">
      <div
        className="relative w-10 h-10 cursor-pointer select-none"
        onClick={() => setExpanded((v) => !v)}
        tabIndex={0}
        aria-label="Abrir menu do perfil"
      >
        {/* Ícone animado */}
        <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-100 scale-100 rotate-0 [div[data-expanded=true]_&]:opacity-0 [div[data-expanded=true]_&]:scale-0 [div[data-expanded=true]_&]:rotate-180" data-expanded={!expanded}>
          <User size={32} strokeWidth={1.5} />
        </div>
        <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-0 scale-0 -rotate-180 [div[data-expanded=true]_&]:opacity-100 [div[data-expanded=true]_&]:scale-100 [div[data-expanded=true]_&]:rotate-0" data-expanded={expanded}>
          <X size={32} strokeWidth={1.5} />
        </div>
      </div>
      {expanded && (
        <div className="absolute left-1/2 top-full -translate-x-1/2 mt-2 flex flex-col items-center gap-2 bg-white border rounded-lg shadow-lg px-4 py-3 z-50 animate-fade-in min-w-[180px]">
          <div className="flex flex-col text-center w-full">
            <span className="font-semibold text-sm">{user.nome}</span>
            <span className="text-xs text-gray-500">{user.email}</span>
          </div>
          <Button size="sm" variant="destructive" className="w-full mt-2" onClick={onLogout}>Sair</Button>
        </div>
      )}
    </div>
  );
}
