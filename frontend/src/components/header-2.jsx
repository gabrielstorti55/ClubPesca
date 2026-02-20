"use client";
import React from "react";
import { ProfileFluidMenu } from "./profile-fluid-menu";
import { useAuth } from "@/context/auth-context";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/menu-toggle-icon";
import { useScroll } from "@/components/use-scroll";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);
  const { user, loading, logout } = useAuth();

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

  React.useEffect(() => {
    if (open) {
      // Disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scroll
      document.body.style.overflow = "";
    }

    // Cleanup when component unmounts (important for Next.js)
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto w-full max-w-5xl border-b border-transparent md:rounded-md md:border md:transition-all md:ease-out",
        {
          "bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg md:top-4 md:max-w-4xl md:shadow":
            scrolled && !open,
          "bg-background/90": open,
        },
      )}
    >
      <nav
        className={cn(
          "flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
          {
            "md:px-2": scrolled,
          },
        )}
      >
        <div className="relative group flex items-center">
          <img src="/Logo-transparente.png" alt="Logo FisgaClub" className="h-12 w-15 transition-all duration-300" />
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-xl font-extrabold text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-16 transition-all duration-500 pointer-events-none select-none drop-shadow-lg"
            style={{letterSpacing: '1px'}}
          >
            FisgaClub
          </span>
        </div>
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
            <ProfileFluidMenu
              user={user}
              onLogout={logout}
            />
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
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </Button>
      </nav>
      <div
        className={cn(
          "bg-background/90 fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div
          data-slot={open ? "open" : "closed"}
          className={cn(
            "data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out",
            "flex h-full w-full flex-col justify-between gap-y-2 p-4",
          )}
        >
          <div className="grid gap-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                className={buttonVariants({
                  variant: "ghost",
                  className: "justify-start",
                })}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="w-full">
              Entrar
            </Button>
            <Button className="w-full">Cadastre-se</Button>
          </div>
        </div>
      </div>
    </header>
  );
}