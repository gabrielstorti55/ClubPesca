import { useState } from "react";
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
import BusinessRating from "@/components/business-rating";
import BusinessReviews from "@/components/business-reviews";

export function PesqueiroCard({ pesqueiro }) {
  const [showReviews, setShowReviews] = useState(false);
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
        <CardTitle>{pesqueiro.name}</CardTitle>
        <BusinessRating businessId={pesqueiro.id} />
        <CardDescription>{pesqueiro.description}</CardDescription>
        {pesqueiro.address &&
        pesqueiro.address.street &&
        pesqueiro.address.city ? (
          <div className="text-sm text-muted-foreground mt-2">
            Endereco: {pesqueiro.address.street}, {pesqueiro.address.number} -{" "}
            {pesqueiro.address.city}, {pesqueiro.address.state}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground mt-2">
            Endereco nao disponivel
          </div>
        )}
        {pesqueiro.phone && (
          <div className="text-sm text-muted-foreground mt-1">
            Telefone: {pesqueiro.phone}
          </div>
        )}
        {pesqueiro.whatsapp && (
          <div className="text-sm text-muted-foreground mt-1">
            WhatsApp:{" "}
            <a
              href={`https://wa.me/${pesqueiro.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline font-medium"
            >
              {pesqueiro.whatsapp}
            </a>
          </div>
        )}
        {pesqueiro.fishes && pesqueiro.fishes.length > 0 && (
          <div className="mt-3 pt-2 border-t">
            <div className="text-xs font-semibold text-blue-900 mb-1">Peixes:</div>
            <div className="flex flex-wrap gap-1">
              {pesqueiro.fishes.map((bf) => (
                <span
                  key={bf.id}
                  className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs"
                >
                  {bf.fish.name}
                </span>
              ))}
            </div>
          </div>
        )}
        {pesqueiro.offers && pesqueiro.offers.length > 0 && (
          <div className="mt-3 pt-2 border-t">
            <div className="text-xs font-semibold text-blue-900 mb-1">Precos:</div>
            {pesqueiro.offers.slice(0, 3).map((offer) => (
              <div key={offer.id} className="text-xs text-muted-foreground flex justify-between">
                <span>{offer.name}</span>
                <span className="font-semibold text-green-700">
                  R$ {offer.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardHeader>
      <CardFooter className="flex flex-col gap-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setShowReviews(true)}
        >
          Ver Avaliacoes
        </Button>
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
          <Button className="w-full" disabled>Ligue para obter mais informacoes</Button>
        )}
      </CardFooter>

      {showReviews && (
        <BusinessReviews
          businessId={pesqueiro.id}
          onClose={() => setShowReviews(false)}
        />
      )}
    </Card>
  );
}
