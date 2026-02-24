import { useState } from "react";
import PhishingIcon from "@mui/icons-material/Phishing";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Header from "@/components/header";
import ProfileBusinessPanel from "@/components/profile-business-panel";
import ProfileTabButton from "@/components/profile-tab-button";
import ProfileUserPanel from "@/components/profile-user-panel";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import { useOwnedBusinesses } from "@/hooks/use-owned-businesses";
import { useNavigate } from "react-router-dom";

export function ProfileTabs() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState("perfil");
  const { businesses, loading, reloadBusinesses } = useOwnedBusinesses(user?.id);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 pt-20">
      <Header />

      <div className="flex flex-col items-center py-10 px-2 min-h-[80vh]">
        <Card className="w-full max-w-2xl p-8 shadow-2xl bg-white/60 backdrop-blur-xl rounded-3xl flex flex-col items-center border border-blue-100">
          <div className="flex w-full mb-8 gap-2 justify-center">
            <ProfileTabButton active={tab === "perfil"} onClick={() => setTab("perfil")}>
              <span className="flex items-center gap-2">
                <PersonOutlinedIcon />
                Meu Perfil
              </span>
            </ProfileTabButton>
            <ProfileTabButton
              active={tab === "pesqueiro"}
              onClick={() => setTab("pesqueiro")}
            >
              <span className="flex items-center gap-2">
                <PhishingIcon />
                Meus Pesqueiros
              </span>
            </ProfileTabButton>
          </div>

          <Separator className="mb-8 w-full" />

          {tab === "perfil" ? (
            <ProfileUserPanel user={user} onLogout={handleLogout} />
          ) : (
            <ProfileBusinessPanel
              loading={loading}
              businesses={businesses}
              onBusinessSave={reloadBusinesses}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
