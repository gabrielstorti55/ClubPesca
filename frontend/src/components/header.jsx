import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { ProfileFluidMenu } from "@/components/profile-fluid-menu";
import { Button, buttonVariants } from "@/components/ui/button";

const links = [
    {
      label: "Destinos",
      href: "#destinos",
    },
    {
      label: "Dicas",
      href: "#dicas",
    },
    {
      label: "Sobre",
      href: "#sobre",
    },
  ];
export default function Header(){

    const { user, loading } = useAuth();
    const [showProfile, setShowProfile] = useState(false);

    return(
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] pointer-events-auto w-[95vw] max-w-4xl rounded-2xl bg-white/70 backdrop-blur-md shadow-lg flex items-center justify-between px-6 py-2 border border-blue-200">
        <a className="flex items-center gap-2 href" href="/home">
          <img
            src="/Logo-transparente.png"
            alt="Logo"
            className="w-10 h-10 rounded-full border border-blue-300 bg-white"
          />
        </a>
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link, i) => (
            <a
              key={i}
              className={buttonVariants({ variant: "ghost" })}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
          {!loading && user ? (
            <ProfileFluidMenu />
          ) : (
            <>
              <Button variant="outline" asChild>
                <a href="/">Entrar</a>
              </Button>
              <Button asChild>
                <a href="/cadastro">Cadastre-se</a>
              </Button>
            </>
          )}
          {showProfile && <Perfil onClose={() => setShowProfile(false)} />}
        </div>
      </header>
    )
}