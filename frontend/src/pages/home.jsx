import React, { useEffect, useMemo, useState } from "react";
import { PesqueiroCard } from "@/components/destaque-card";
import Header from "@/components/header";

const dicas = [
  {
    titulo: "Como escolher a isca ideal?",
    texto: "Veja dicas para aumentar suas chances de sucesso na pescaria.",
  },
  {
    titulo: "Equipamentos recomendados",
    texto: "Conheca os melhores equipamentos para cada tipo de peixe.",
  },
];

export default function Home() {
  const [business, setBusiness] = useState([]);
  const [nomeFiltro, setNomeFiltro] = useState("");
  const [cidadeFiltro, setCidadeFiltro] = useState("todos");
  const [tipoFiltro, setTipoFiltro] = useState("todos");

  useEffect(() => {
    const buscarDados = async () => {
      const response = await fetch("http://localhost:3000/business/getAll");
      const data = await response.json();
      setBusiness(data);
    };

    buscarDados();
  }, []);

  const cidades = useMemo(() => {
    const lista = business.map((item) => item.address?.city).filter(Boolean);
    return [...new Set(lista)].sort((a, b) => a.localeCompare(b));
  }, [business]);

  const tipos = useMemo(() => {
    const lista = business
      .map((item) => item.type?.name || item.typeName)
      .filter(Boolean);
    return [...new Set(lista)].sort((a, b) => a.localeCompare(b));
  }, [business]);

  const businessFiltrados = useMemo(() => {
    const nomeBusca = nomeFiltro.trim().toLowerCase();
    const cidadeSelecionada = cidadeFiltro.toLowerCase();
    const tipoSelecionado = tipoFiltro.toLowerCase();

    return business.filter((item) => {
      const nome = (item.name || "").toLowerCase();
      const cidade = (item.address?.city || "").toLowerCase();
      const tipo = (item.type?.name || item.typeName || "").toLowerCase();

      const passouNome = !nomeBusca || nome.includes(nomeBusca);
      const passouCidade =
        cidadeFiltro === "todos" || cidade === cidadeSelecionada;
      const passouTipo = tipoFiltro === "todos" || tipo === tipoSelecionado;

      return passouNome && passouCidade && passouTipo;
    });
  }, [business, nomeFiltro, cidadeFiltro, tipoFiltro]);

  const limparFiltros = () => {
    setNomeFiltro("");
    setCidadeFiltro("todos");
    setTipoFiltro("todos");
  };

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
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
            FisgaClub
          </h1>
          <p className="text-2xl md:text-3xl text-white mb-6 drop-shadow">
            Descubra os melhores destinos de pesca esportiva
          </p>
        </div>
      </section>

      <section className="w-full py-8 px-2 bg-blue-100/60 flex flex-col items-center">
        <div className="w-full max-w-7xl mb-6 px-2">
          <div className="w-full bg-white/80 border border-blue-200 rounded-xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-900">Filtros</h3>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-2">
                <label
                  htmlFor="filtro-nome"
                  className="block text-sm font-medium text-blue-900 mb-1"
                >
                  Nome
                </label>
                <input
                  id="filtro-nome"
                  type="text"
                  placeholder="Digite o nome do pesqueiro"
                  value={nomeFiltro}
                  onChange={(e) => setNomeFiltro(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-blue-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label
                  htmlFor="filtro-cidade"
                  className="block text-sm font-medium text-blue-900 mb-1"
                >
                  Cidade
                </label>
                <select
                  id="filtro-cidade"
                  value={cidadeFiltro}
                  onChange={(e) => setCidadeFiltro(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-blue-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="todos">Todas</option>
                  {cidades.map((cidade) => (
                    <option key={cidade} value={cidade}>
                      {cidade}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="filtro-tipo"
                  className="block text-sm font-medium text-blue-900 mb-1"
                >
                  Tipo
                </label>
                <select
                  id="filtro-tipo"
                  value={tipoFiltro}
                  onChange={(e) => setTipoFiltro(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-blue-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="todos">Todos</option>
                  {tipos.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-sm text-blue-800">
                {businessFiltrados.length} resultado(s)
              </span>
              <button
                type="button"
                onClick={limparFiltros}
                className="h-9 px-4 rounded-md border border-blue-300 bg-blue-50 text-blue-800 text-sm font-medium hover:bg-blue-100 transition"
              >
                Limpar filtros
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-6 flex-wrap justify-center w-full max-w-7xl">
          {businessFiltrados.map((item) => (
            <PesqueiroCard key={item.id} pesqueiro={item} />
          ))}
          {businessFiltrados.length === 0 && (
            <div className="w-full text-center py-10 text-blue-900 font-medium">
              Nenhum pesqueiro encontrado com os filtros selecionados.
            </div>
          )}
        </div>
      </section>

      <section className="py-10 px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          Dicas & Novidades
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
            &copy; 2026 FisgaClub. Todos os direitos reservados.
          </span>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:underline text-white text-lg">
              Instagram
            </a>
            <a href="#" className="hover:underline text-white text-lg">
              Facebook
            </a>
            <a href="#" className="hover:underline text-white text-lg">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
