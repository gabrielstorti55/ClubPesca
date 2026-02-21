import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useAuth } from "@/context/auth-context";
import BusinessEditForm from "@/components/business-edit-form";
import BusinessPhotosManager from "@/components/business-photos-manager";

function TabButton({ active, onClick, children }) {
  return (
    <button
      className={`px-4 py-2 rounded-t-md font-semibold transition border-b-2 ${active ? "border-blue-600 text-blue-900 bg-white" : "border-transparent text-blue-700 bg-blue-100 hover:bg-blue-200"}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function ProfileTabs() {
  const { user } = useAuth();
  const [tab, setTab] = useState("perfil");
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBusiness() {
      if (!user) return;
      setLoading(true);
      const res = await fetch(`http://localhost:3000/business/getAll`);
      const all = await res.json();
      // Busca o business do usuário logado
      const found = all.find(b => b.ownerId === user.id);
      setBusiness(found || null);
      setLoading(false);
    }
    fetchBusiness();
  }, [user]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300">
      <div className="flex flex-col items-center py-8">
        <Card className="w-full max-w-2xl p-8 shadow-xl bg-white/80 rounded-xl flex flex-col items-center">
          <div className="flex w-full mb-6">
            <TabButton active={tab === "perfil"} onClick={() => setTab("perfil")}>Meu Perfil</TabButton>
            {business && (
              <TabButton active={tab === "pesqueiro"} onClick={() => setTab("pesqueiro")}>Meu Pesqueiro</TabButton>
            )}
          </div>
          <Separator className="mb-6 w-full" />
          {tab === "perfil" && (
            <div className="flex flex-col items-center w-full">
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}`}
                alt="Avatar do usuário"
                className="w-28 h-28 rounded-full border-4 border-blue-300 shadow mb-4"
              />
              <h2 className="text-2xl font-bold text-blue-900 mb-1">{user?.name}</h2>
              <p className="text-blue-700 text-sm mb-4">{user?.email}</p>
              <Button className="w-full" variant="secondary">Editar Perfil</Button>
            </div>
          )}
          {tab === "pesqueiro" && business && (
            <div className="flex flex-col items-center w-full">
              <h2 className="text-xl font-bold text-blue-900 mb-2">{business.name}</h2>
              <p className="text-blue-700 text-sm mb-2">{business.description}</p>
              <p className="text-blue-700 text-sm mb-2">Telefone: {business.phone || "-"}</p>
              <p className="text-blue-700 text-sm mb-2">Endereço: {business.address?.street}, {business.address?.number} - {business.address?.city}/{business.address?.state}</p>
              <div className="w-full mt-4 mb-2">
                <BusinessEditForm business={business} onSave={() => window.location.reload()} />
              </div>
              <BusinessPhotosManager businessId={business.id} />
            </div>
          )}
          {tab === "pesqueiro" && !business && !loading && (
            <div className="text-blue-800">Você ainda não possui um pesqueiro cadastrado.</div>
          )}
        </Card>
      </div>
    </div>
  );
}
