import { useEffect, useMemo, useState } from "react";
import { apiUrl } from "@/lib/api";

export function useBusinessFilters() {
  const [business, setBusiness] = useState([]);
  const [nomeFiltro, setNomeFiltro] = useState("");
  const [cidadeFiltro, setCidadeFiltro] = useState("todos");
  const [tipoFiltro, setTipoFiltro] = useState("todos");

  useEffect(() => {
    async function buscarDados() {
      const response = await fetch(apiUrl("/business/getAll"));
      const data = await response.json();
      setBusiness(data);
    }

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

  function limparFiltros() {
    setNomeFiltro("");
    setCidadeFiltro("todos");
    setTipoFiltro("todos");
  }

  return {
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
  };
}
