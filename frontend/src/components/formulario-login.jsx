import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro no login");
        return;
      }

      if (!data.token) {
        throw new Error("Token não retornado pela API");
      }

      localStorage.setItem("token", data.token);

      console.log("Login realizado:", data);

      navigate("/home");
      window.location.reload();
    } catch (error) {
      alert("Erro ao conectar. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bem-vindo de volta!</CardTitle>
          <CardDescription>
            Faça login com sua conta Apple ou Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" type="button" className="flex items-center justify-center gap-2 w-full">
                    <span className="flex items-center justify-center w-5 h-5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path d="M16.365 1.43c0 1.14-.93 2.06-2.07 2.06-.02 0-.04 0-.06-.01-.17-1.09 1.01-2.06 2.07-2.05zm-1.76 2.82c1.14 0 1.62.77 3.03.77 1.41 0 1.85-.75 3.04-.75.97 0 1.99.56 2.72 1.52-2.39 1.31-1.98 4.7.47 5.56-.38 1.13-.98 2.23-1.75 3.13-.77.91-1.62 1.81-2.77 1.78-1.13-.03-1.48-.72-2.77-.72-1.29 0-1.6.7-2.77.73-1.15.03-2.06-.98-2.83-1.89-.77-.91-1.36-2.01-1.74-3.14 2.47-.86 2.87-4.25.47-5.56.73-.96 1.75-1.52 2.72-1.52z" fill="currentColor" />
                      </svg>
                    </span>
                    Entrar com Apple
                  </Button>
                  <Button variant="outline" type="button" className="flex items-center justify-center gap-2 w-full">
                    <span className="flex items-center justify-center w-5 h-5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <g fill="none"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" fill="#fff"/><path d="M21.805 12.276c0-.638-.057-1.25-.163-1.837H12v3.48h5.52a4.72 4.72 0 0 1-2.05 3.1v2.58h3.31c1.94-1.79 3.025-4.43 3.025-7.323Z" fill="#4285F4"/><path d="M12 22c2.7 0 4.97-.89 6.627-2.42l-3.31-2.58c-.92.62-2.09.99-3.317.99-2.55 0-4.71-1.72-5.48-4.04H3.1v2.54A9.997 9.997 0 0 0 12 22Z" fill="#34A853"/><path d="M6.52 13.95A5.99 5.99 0 0 1 6.13 12c0-.68.12-1.34.33-1.95V7.51H3.1A9.997 9.997 0 0 0 2 12c0 1.64.39 3.19 1.1 4.54l3.42-2.59Z" fill="#FBBC05"/><path d="M12 6.88c1.47 0 2.78.51 3.81 1.51l2.85-2.85C17.03 3.89 14.73 3 12 3A9.997 9.997 0 0 0 3.1 7.51l3.42 2.54C7.29 8.6 9.45 6.88 12 6.88Z" fill="#EA4335"/></g>
                      </svg>
                    </span>
                    Entrar com Google
                  </Button>
                </div>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Ou continue com
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Button type="submit">Entrar</Button>
                <FieldDescription className="text-center">
                  Não tem uma conta?{" "}
                  <Link
                    to="/cadastro"
                    className="text-primary underline hover:no-underline"
                  >
                    Cadastre-se
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
