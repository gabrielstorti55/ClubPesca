import { GalleryVerticalEnd } from "lucide-react"
import { SignupForm } from "@/components/formulario-cadastro"

export default function SignupPage() {
  return (
    <div className="grid min-h-screen w-screen lg:grid-cols-2 items-center justify-center" style={{height: '100vh', maxHeight: '100vh', overflow: 'hidden'}}>
      <div className="flex flex-col gap-4 p-6 md:p-10 h-full w-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent">
        <div className="flex justify-center gap-2 md:justify-center">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            ClubPescar
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="relative hidden w-full h-full lg:block">
        <img
          src="/Imagem-pesca.jpg"
          alt="Imagem"
          className="absolute inset-0 h-full w-full object-cover object-center dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
