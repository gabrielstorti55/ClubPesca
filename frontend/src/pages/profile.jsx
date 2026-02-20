import { Button } from "@/components/ui/button";
import { Header } from "@/components/header-2";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { jwt } from "zod";

export function Perfil() {
  const [profile, setProfile] = useState("");

  const user = {
    nome: "João da Silva",
    email: "joao@email.com",
    tipo: "Pescador",
    cidade: "Florianópolis",
    estado: "SC",
    avatar:
      "https://ui-avatars.com/api/?name=Joao+da+Silva&background=0D8ABC&color=fff",
  };

  useEffect(() => {
    const BuscarPerfil = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch("http://localhost:3000/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        setProfile(error)
      }
    };
    BuscarPerfil();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300">
      <Header />
      <div className="flex flex-1 items-center justify-center py-8">
        <Card className="w-full max-w-md p-8 shadow-xl bg-white/80 rounded-xl flex flex-col items-center">
          <img
            src={profile.avatar}
            alt="Avatar do usuário"
            className="w-28 h-28 rounded-full border-4 border-blue-300 shadow mb-4"
          />
          <h2 className="text-2xl font-bold text-blue-900 mb-1">
            {profile.name}
          </h2>
          <p className="text-blue-700 text-sm mb-4">{profile.email}</p>
          <Separator className="my-4 w-full" />
          <Button className="w-full" variant="secondary">
            Editar Perfil
          </Button>
        </Card>
      </div>
    </div>
  );
}
