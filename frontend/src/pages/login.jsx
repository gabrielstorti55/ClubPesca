import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/formulario-login"

export default function LoginPage() {
  return (
    <div className="grid min-h-screen w-screen lg:grid-cols-2 items-center justify-center" style={{height: '100vh', maxHeight: '100vh', overflow: 'hidden'}}>
      <div className="flex flex-col gap-4 p-6 md:p-10 max-w-md w-full mx-auto justify-center h-full">
        <div className="flex justify-center gap-2 md:justify-center">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <span className="font-display">FisgaClub</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden w-full lg:block" style={{ height: "115vh"}}>
        <img
          src="/Imagem-pesca.jpg"
          alt="Imagem"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
