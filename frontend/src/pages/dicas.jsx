
import Header from "@/components/header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const dicas = [
  {
    titulo: "Conheça o local de pesca",
    texto: "Pesquise sobre o ambiente, tipos de peixes e regulamentos locais antes de pescar.",
  },
  {
    titulo: "Use o equipamento adequado",
    texto: "Escolha vara, linha, anzol e isca de acordo com o peixe e o local.",
  },
  {
    titulo: "Aposte em iscas naturais",
    texto: "Iscas naturais costumam ser mais atrativas para a maioria dos peixes.",
  },
  {
    titulo: "Seja paciente e silencioso",
    texto: "Movimente-se devagar e evite barulhos para não espantar os peixes.",
  },
  {
    titulo: "Observe o clima e a lua",
    texto: "Dias nublados e fases de lua cheia ou nova costumam ser melhores para pesca.",
  },
  {
    titulo: "Respeite o meio ambiente",
    texto: "Não deixe lixo, respeite cotas e pratique o pesque e solte sempre que possível.",
  },
  {
    titulo: "Mantenha o material organizado",
    texto: "Revise e organize seu material antes e depois da pescaria para evitar imprevistos.",
  },
  {
    titulo: "Aprenda a fazer nós de pesca",
    texto: "Nós bem feitos garantem que o peixe não escape e evitam perda de material.",
  },
];

export default function Dicas() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300">
      <Header />
      <div className="max-w-2xl w-full mx-auto mt-8 px-4 pb-12">
        <h1 className="text-2xl font-bold mb-6 text-blue-900">Dicas para Usuários</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {dicas.map((dica, idx) => (
            <Card
              key={idx}
              className="bg-white/90 border-blue-200 aspect-square flex flex-col justify-between"
            >
              <CardHeader className="flex-1 flex flex-col justify-center items-center text-center p-6 pb-2">
                <CardTitle className="text-blue-800 text-lg">{dica.titulo}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center p-6 pt-2">
                <p className="text-gray-700 text-base">{dica.texto}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
