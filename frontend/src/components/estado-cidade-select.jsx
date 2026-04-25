
import React, { useEffect, useState, useMemo } from "react";

export default function EstadoCidadeSelect({ onChange }) {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [loadingEstados, setLoadingEstados] = useState(true);
  const [loadingCidades, setLoadingCidades] = useState(false);

  // Buscar estados ao carregar
  useEffect(() => {
    setLoadingEstados(true);
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
      .then((res) => res.json())
      .then((data) => setEstados(data))
      .finally(() => setLoadingEstados(false));
  }, []);

  // Buscar cidades quando o estado mudar
  useEffect(() => {
    if (estadoSelecionado) {
      setLoadingCidades(true);
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`)
        .then((res) => res.json())
        .then((data) => setCidades(data))
        .finally(() => setLoadingCidades(false));
    } else {
      setCidades([]);
      setCidadeSelecionada("");
    }
  }, [estadoSelecionado]);

  // Memoizar cidades para performance
  const cidadesMemo = useMemo(() => cidades, [cidades]);

  // Notificar mudança
  useEffect(() => {
    if (onChange) {
      onChange({ estado: estadoSelecionado, cidade: cidadeSelecionada });
    }
  }, [estadoSelecionado, cidadeSelecionada, onChange]);

  return (
    <div className="flex flex-col gap-2">
      <div>
        <label className="block text-sm font-medium mb-1">Estado *</label>
        <div className="relative">
          <select
            value={estadoSelecionado}
            onChange={(e) => {
              setEstadoSelecionado(e.target.value);
              setCidadeSelecionada("");
            }}
            className="block w-full rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition"
            disabled={loadingEstados}
          >
            <option value="">{loadingEstados ? "Carregando..." : "Selecione o estado"}</option>
            {estados.map((estado) => (
              <option key={estado.id} value={estado.id}>
                {estado.nome}
              </option>
            ))}
          </select>
          {loadingEstados && (
            <span className="absolute right-3 top-2 text-xs text-blue-400 animate-pulse">⏳</span>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Cidade *</label>
        <div className="relative">
          <select
            value={cidadeSelecionada}
            onChange={(e) => setCidadeSelecionada(e.target.value)}
            className="block w-full rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition"
            disabled={!estadoSelecionado || loadingCidades}
          >
            <option value="">
              {!estadoSelecionado
                ? "Selecione o estado primeiro"
                : loadingCidades
                ? "Carregando..."
                : "Selecione a cidade"}
            </option>
            {cidadesMemo.map((cidade) => (
              <option key={cidade.id} value={cidade.nome}>
                {cidade.nome}
              </option>
            ))}
          </select>
          {loadingCidades && (
            <span className="absolute right-3 top-2 text-xs text-blue-400 animate-pulse">⏳</span>
          )}
        </div>
      </div>
    </div>
  );
}
