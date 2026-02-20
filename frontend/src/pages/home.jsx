import React, { useEffect, useState } from "react";
import { Header } from "@/components/header-2";
import { PesqueiroCard } from "@/components/destaque-card";
import { any } from "zod";

const dicas = [
  {
    titulo: "Como escolher a isca ideal?",
    texto: "Veja dicas para aumentar suas chances de sucesso na pescaria.",
  },
  {
    titulo: "Equipamentos recomendados",
    texto: "Conheça os melhores equipamentos para cada tipo de peixe.",
  },
];

export default function Home() {
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    const buscarDados = async () => {
      const response = await fetch("http://localhost:3000/business/getAll");
      const data = await response.json();
      setBusiness(data);
    };
    buscarDados();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300">
      <Header />

      {/* Banner principal */}
      <section className="relative w-full h-[420px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
          alt="Banner de pescaria"
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm brightness-75"
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

      {/* Destinos de pesca */}
      <div className="flex flex-row gap-2 flex-wrap justify-center">
        {business.map((item) => (
          <PesqueiroCard key={item.id} pesqueiro={item} />
        ))}
      </div>
      {/* Dicas e novidades */}
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

      {/* Rodapé */}
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
