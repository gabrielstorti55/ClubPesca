import { useState } from "react";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import { useAuth } from "@/context/auth-context";
import { ProfileFluidMenu } from "@/components/profile-fluid-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/sheet";

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

export default function Header() {
  const { user, loading } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-1rem)] sm:w-[95vw] max-w-5xl rounded-2xl bg-white/85 backdrop-blur-md shadow-lg border border-blue-200">
      <div className="flex items-center justify-between gap-2 px-3 py-2 sm:px-4 lg:px-6">
        <a className="flex items-center gap-2" href="/">
          <img
            src="/Logo-transparente.png"
            alt="Logo"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-blue-300 bg-white"
          />
          <span className="font-display hidden sm:inline text-blue-900 font-bold">
            FisgaClub
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-2">
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
                <a href="/login">Entrar</a>
              </Button>
              <Button asChild>
                <a href="/cadastro">Cadastre-se</a>
              </Button>
            </>
          )}
        </div>

        <div className="lg:hidden">
          <Sheet open={openMenu} onOpenChange={setOpenMenu}>
            <SheetTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="h-9 w-9 border-blue-200 bg-white/80"
              >
                <ListRoundedIcon fontSize="small" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] max-w-xs bg-white/95 backdrop-blur-md"
            >
              <nav className="mt-10 flex flex-col gap-2">
                {links.map((link, i) => (
                  <a
                    key={i}
                    className={buttonVariants({
                      variant: "ghost",
                      className: "justify-start w-full",
                    })}
                    href={link.href}
                    onClick={() => setOpenMenu(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="mt-6 border-t border-blue-100 pt-4 flex flex-col gap-2">
                {!loading && user ? (
                  <Button asChild className="w-full">
                    <a href="/profile" onClick={() => setOpenMenu(false)}>
                      Meu perfil
                    </a>
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" asChild className="w-full">
                      <a href="/login" onClick={() => setOpenMenu(false)}>
                        Entrar
                      </a>
                    </Button>
                    <Button asChild className="w-full">
                      <a href="/cadastro" onClick={() => setOpenMenu(false)}>
                        Cadastre-se
                      </a>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
