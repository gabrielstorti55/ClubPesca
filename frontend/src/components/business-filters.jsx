export default function BusinessFilters({
  nomeFiltro,
  setNomeFiltro,
  cidadeFiltro,
  setCidadeFiltro,
  tipoFiltro,
  setTipoFiltro,
  cidades,
  tipos,
  totalResultados,
  onLimparFiltros,
}) {
  return (
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
        <span className="text-sm text-blue-800">{totalResultados} resultado(s)</span>
        <button
          type="button"
          onClick={onLimparFiltros}
          className="h-9 px-4 rounded-md border border-blue-300 bg-blue-50 text-blue-800 text-sm font-medium hover:bg-blue-100 transition"
        >
          Limpar filtros
        </button>
      </div>
    </div>
  );
}
