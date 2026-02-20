import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PesqueiroCard({ pesqueiro }) {
  return (
    <Card className="relative mx-4 mt-9 w-full max-w-sm pt-0 rounded-2xl border bg-card">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35 rounded-t-2xl" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40 rounded-t-2xl"
      />
      <CardHeader>
        <Badge variant="secondary">
          {pesqueiro.active ? "Aberto" : "Fechado"}
        </Badge>
        <CardTitle>{pesqueiro.name}</CardTitle>
        <CardDescription>{pesqueiro.description}</CardDescription>
        {pesqueiro.address &&
        pesqueiro.address.street &&
        pesqueiro.address.city ? (
          <div className="text-sm text-muted-foreground mt-2">
            Endereço: {pesqueiro.address.street}, {pesqueiro.address.number} -{" "}
            {pesqueiro.address.city}, {pesqueiro.address.state}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground mt-2">
            Endereço não disponível
          </div>
        )}
        {pesqueiro.phone && (
          <div className="text-sm text-muted-foreground mt-1">
            Telefone: {pesqueiro.phone}
          </div>
        )}
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Event</Button>
      </CardFooter>
    </Card>
  );
}
