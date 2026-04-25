import { PesqueiroCard } from "@/components/destaque-card";
import BusinessFilters from "@/components/business-filters";
import Header from "@/components/header";
import { useBusinessFilters } from "@/hooks/use-business-filters";

const dicas = [
  {
    titulo: "Escolha a isca certa",
    texto: "Aumente suas chances de sucesso com as melhores iscas para cada situação.",
  },
  {
    titulo: "Equipamento ideal",
    texto: "Descubra qual equipamento usar para cada tipo de peixe e torne sua pescaria mais eficiente.",
  },
];

export default function Home() {
  const {
    nomeFiltro,
    setNomeFiltro,
    cidadeFiltro,
    setCidadeFiltro,
    tipoFiltro,
    setTipoFiltro,
    cidades,
    tipos,
    businessFiltrados,
    limparFiltros,
  } = useBusinessFilters();

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300">
      <Header />

      <section
        className="relative w-full h-[420px] flex items-center justify-center overflow-hidden p-0 m-0"
        style={{ marginTop: 0, paddingTop: 0 }}
      >
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
          alt="Banner de pescaria"
          className="absolute top-0 left-0 w-full h-full object-cover scale-110 blur-sm brightness-75 z-0"
          style={{ top: 0 }}
        />
        <div className="relative z-10 text-center flex flex-col items-center">
          <h1 className="font-display text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
            FisgaClub
          </h1>
          <p className="text-2xl md:text-3xl text-white mb-6 drop-shadow">
            Encontre os melhores lugares de lazer e pesca perto de você
          </p>
        </div>
      </section>

      <section className="w-full py-8 px-2 bg-blue-100/60 flex flex-col items-center">
        <div className="w-full max-w-7xl mb-6 px-2">
          <BusinessFilters
            nomeFiltro={nomeFiltro}
            setNomeFiltro={setNomeFiltro}
            cidadeFiltro={cidadeFiltro}
            setCidadeFiltro={setCidadeFiltro}
            tipoFiltro={tipoFiltro}
            setTipoFiltro={setTipoFiltro}
            cidades={cidades}
            tipos={tipos}
            totalResultados={businessFiltrados.length}
            onLimparFiltros={limparFiltros}
          />
        </div>

        <div className="flex flex-row gap-6 flex-wrap justify-center w-full max-w-7xl">
          {businessFiltrados.map((item) => (
            <PesqueiroCard key={item.id} pesqueiro={item} />
          ))}
          {businessFiltrados.length === 0 && (
            <div className="w-full text-center py-10 text-blue-900 font-medium">
              Não encontramos pesqueiros com os filtros escolhidos. Tente ajustar sua busca!
            </div>
          )}
        </div>
      </section>

      <section className="py-10 px-4 max-w-7xl mx-auto w-full">
        <h2 className="font-display text-2xl font-bold text-blue-900 mb-6 text-center">
          Dicas para sua pescaria
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dicas.map((dica, idx) => (
            <div
              key={idx}
              className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-start hover:bg-blue-200 transition"
            >
              <h4 className="font-semibold text-lg mb-2 text-blue-800">
                {dica.titulo}
              </h4>
              <p className="text-base text-gray-700">{dica.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-blue-900 text-white py-8 mt-auto w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <span className="text-lg">
            &copy; 2026 FisgaClub. Sua comunidade de pesca.
          </span>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:underline text-white text-lg">
              Instagram
            </a>
            <a href="#" className="hover:underline text-white text-lg">
              Facebook
            </a>
            <a href="#" className="hover:underline text-white text-lg">
              Fale conosco
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
