import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/header";
import { useAuth } from "@/context/auth-context";
import BusinessEditForm from "@/components/business-edit-form";
import BusinessPhotosManager from "@/components/business-photos-manager";
import PhishingIcon from '@mui/icons-material/Phishing';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

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
  const { user, logout} = useAuth();
  const [tab, setTab] = useState("perfil");
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  useEffect(() => {
    async function fetchBusinesses() {
      if (!user) return;
      setLoading(true);
      const res = await fetch(`http://localhost:3000/business/getAll`);
      const all = await res.json();
      // Busca todos os pesqueiros do usuário logado
      const filtered = all.filter(b => b.ownerId === user.id);
      setBusinesses(filtered);
      setLoading(false);
    }
    fetchBusinesses();
  }, [user]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 pt-20">
      <Header />
      <div className="flex flex-col items-center py-10 px-2 min-h-[80vh]">
        <Card className="w-full max-w-2xl p-8 shadow-2xl bg-white/60 backdrop-blur-xl rounded-3xl flex flex-col items-center border border-blue-100">
          <div className="flex w-full mb-8 gap-2 justify-center">
            <TabButton active={tab === 'perfil'} onClick={() => setTab('perfil')}>
              <span className="flex items-center gap-2">
              <PersonOutlinedIcon/>
                Meu Perfil
              </span>
            </TabButton>
            <TabButton active={tab === 'pesqueiro'} onClick={() => setTab('pesqueiro')}>
              <span className="flex items-center gap-2">
                <PhishingIcon/>
                Meus Pesqueiros
              </span>
            </TabButton>
          </div>
          <Separator className="mb-8 w-full" />
          {tab === 'perfil' && (
            <div className="flex flex-col items-center w-full animate-fade-in">
              <div className="relative mb-4">
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=E0E7FF&color=1E3A8A&bold=true`}
                  alt="Avatar do usuário"
                  className="w-28 h-28 rounded-full border-4 border-blue-300 shadow-lg object-cover bg-blue-100"
                />
                <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></span>
              </div>
              <h2 className="text-3xl font-extrabold text-blue-900 mb-1 tracking-tight">{user?.name}</h2>
              <p className="text-blue-700 text-base mb-6">{user?.email}</p>
              <Button className="w-full max-w-xs transition hover:scale-105 border-gray-400" variant="secondary">Editar Perfil</Button>
              <Button className="w-full max-w-xs transition hover:scale-105 bg-red-600 mt-2" variant="secondary" onClick={handleLogout}>Sair</Button>
            </div>
          )}
          {tab === 'pesqueiro' && (
            <div className="flex flex-col items-center w-full animate-fade-in">
              {loading ? (
                <div className="text-blue-700 text-lg py-8">Carregando pesqueiros...</div>
              ) : businesses.length > 0 ? (
                businesses.map(business => (
                  <div key={business.id} className="mb-10 w-full bg-blue-50/60 rounded-2xl p-6 shadow border border-blue-100">
                    <h2 className="text-xl font-bold text-blue-900 mb-2">{business.name}</h2>
                    <p className="text-blue-700 text-sm mb-2">{business.description}</p>
                    <p className="text-blue-700 text-sm mb-2">Telefone: {business.phone || '-'}</p>
                    <p className="text-blue-700 text-sm mb-2">Endereço: {business.address?.street}, {business.address?.number} - {business.address?.city}/{business.address?.state}</p>
                    <BusinessPhotosManager businessId={business.id} />
                    <div className="w-full mt-4 mb-2">
                      <BusinessEditForm business={business} onSave={() => window.location.reload()} />
                    </div>
                    <Separator className="my-6 w-full" />
                  </div>
                ))
              ) : (
                <div className="text-blue-800 py-8">Você ainda não possui pesqueiros cadastrados.</div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
