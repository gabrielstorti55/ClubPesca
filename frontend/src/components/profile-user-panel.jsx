import { Button } from "@/components/ui/button";

export default function ProfileUserPanel({ user, onLogout }) {
  return (
    <div className="flex flex-col items-center w-full animate-fade-in">
      <div className="relative mb-4">
        <img
          src={
            user?.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.name || "U"
            )}&background=E0E7FF&color=1E3A8A&bold=true`
          }
          alt="Avatar do usuario"
          className="w-28 h-28 rounded-full border-4 border-blue-300 shadow-lg object-cover bg-blue-100"
        />
        <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></span>
      </div>

      <h2 className="text-3xl font-extrabold text-blue-900 mb-1 tracking-tight">
        {user?.name}
      </h2>
      <p className="text-blue-700 text-base mb-6">{user?.email}</p>

      <Button
        className="w-full max-w-xs transition hover:scale-105 border-gray-400"
        variant="secondary"
      >
        Editar Perfil
      </Button>
      <Button
        className="w-full max-w-xs transition hover:scale-105 bg-red-600 mt-2"
        variant="secondary"
        onClick={onLogout}
      >
        Sair
      </Button>
    </div>
  );
}
