import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { assetUrl } from "@/lib/api";

export function PesqueiroCard({ pesqueiro }) {
  // Lógica para calcular se está aberto agora
  let isOpen = false;
  if (pesqueiro.openDays && pesqueiro.openingTime && pesqueiro.closingTime) {
    const diasMap = {
      0: 'domingo', 1: 'segunda', 2: 'terca', 3: 'quarta', 4: 'quinta', 5: 'sexta', 6: 'sabado'
    };
    const now = new Date();
    const diaHoje = diasMap[now.getDay()];
    if (pesqueiro.openDays.includes(diaHoje)) {
      const [hA, mA] = pesqueiro.openingTime.split(":").map(Number);
      const [hF, mF] = pesqueiro.closingTime.split(":").map(Number);
      const agoraMin = now.getHours() * 60 + now.getMinutes();
      const abreMin = hA * 60 + mA;
      const fechaMin = hF * 60 + mF;
      if (fechaMin > abreMin) {
        // Horário normal (mesmo dia)
        isOpen = agoraMin >= abreMin && agoraMin < fechaMin;
      } else {
        // Fecha no dia seguinte (ex: abre 18:00, fecha 02:00)
        isOpen = agoraMin >= abreMin || agoraMin < fechaMin;
      }
    }
  }
  return (
    <Card className="relative mx-4 mt-9 w-full max-w-sm pt-0 rounded-2xl border bg-card">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35 rounded-t-2xl" />
      <img
        src={
          pesqueiro.photos && pesqueiro.photos.length > 0
            ? assetUrl(pesqueiro.photos[0].url)
            : "https://avatar.vercel.sh/shadcn1"
        }
        alt="Foto do pesqueiro"
        className="relative z-20 aspect-video w-full object-cover rounded-t-2xl"
      />
      <CardHeader>
        <Badge variant={isOpen ? "secondary" : "destructive"}>
          {isOpen ? "Aberto" : "Fechado"}
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
       {pesqueiro.website ? (
          <a
            href={pesqueiro.website}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button className="w-full">Ver Site</Button>
          </a>
        ) : (
          <Button className="w-full" disabled>Ligue para obter mais informações</Button>
        )}
      </CardFooter>
    </Card>
  );
}
