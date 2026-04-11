import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "@/lib/api";

export function SignupForm({ className, ...props }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    if (!nome || !email || !senha || !confirmSenha) {
      setMensagem("Preencha todos os campos!");
      return;
    }
    if (senha !== confirmSenha) {
      setMensagem("As senhas não coincidem!");
      return;
    }
    try {
      const response = await fetch(apiUrl("/auth/cadastro"), {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name: nome, email, password: senha }),
      });
      console.log(response);
      if (!response.ok) {
        setMensagem("Erro ao cadastrar. Tente novamente.");
        return;
      }
      setMensagem("Cadastro realizado com sucesso! Redirecionando...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao conectar. Tente novamente.");
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6 h-full justify-center", className)}
      style={{ minHeight: 0, height: "100%" }}
      {...props}
      onSubmit={handleSubmit}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="font-display text-2xl font-bold">Crie sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Preencha o formulário abaixo para criar sua conta
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Nome completo</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="João Silva"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Field>
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
          <FieldDescription>
            Usaremos este e-mail para contato. Não compartilharemos seu e-mail
            com ninguém.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input
            id="password"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <FieldDescription>Deve ter pelo menos 8 caracteres.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirme a senha</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
            required
          />
          <FieldDescription>Por favor, confirme sua senha.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit">Criar conta</Button>
        </Field>
        {mensagem && (
          <FieldDescription className="text-center text-green-600">
            {mensagem}
          </FieldDescription>
        )}
        <Field>
          <FieldDescription className="px-6 text-center">
            Já tem uma conta? <a href="/login">Entrar</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
