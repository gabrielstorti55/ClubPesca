import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiUrl } from "@/lib/api";

import peixesData from "../data/peixes.json";

export default function BusinessFishManager({ businessId }) {
  const [businessFishes, setBusinessFishes] = useState([]);
  const [allFishes, setAllFishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(null); // null | "select"
  const [selectedJsonFish, setSelectedJsonFish] = useState("");

  useEffect(() => {
    loadData();
  }, [businessId]);

  async function loadData() {
    setLoading(true);
    try {
      const [allResponse, businessResponse] = await Promise.all([
        fetch(apiUrl("/fish")),
        fetch(apiUrl(`/fish/business/${businessId}`)),
      ]);

      if (allResponse.ok) {
        setAllFishes(await allResponse.json());
      }
      if (businessResponse.ok) {
        setBusinessFishes(await businessResponse.json());
      }
    } catch (error) {
      console.error("Erro ao carregar peixes:", error);
    }
    setLoading(false);
  }

  function cancelForm() {
    setMode(null);
    setSelectedJsonFish("");
  }

  async function handleSelectFish(e) {
    e.preventDefault();
    if (!selectedJsonFish) return;

    let fishName = selectedJsonFish;
    
    const token = localStorage.getItem("token");
    try {
      // Verifica se o peixe ja existe no banco
      let fishInDb = allFishes.find(
        (f) => f.name.toLowerCase() === fishName.toLowerCase()
      );

      let fishId = fishInDb?.id;

      // Se nao existe, cria o peixe no catalogo publico
      if (!fishId) {
        const createResponse = await fetch(apiUrl("/fish"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: fishName,
            type: "doce"
          }),
        });

        if (!createResponse.ok) {
          const err = await createResponse.json().catch(() => null);
          alert(err?.error || "Erro ao adicionar peixe ao catalogo");
          return;
        }
        const createdFish = await createResponse.json();
        fishId = createdFish.id;
      }

      // Associa o peixe ao pesqueiro
      const addResponse = await fetch(apiUrl(`/fish/business/${businessId}`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fishId }),
      });

      if (addResponse.ok) {
        cancelForm();
        loadData();
      } else {
        const err = await addResponse.json().catch(() => null);
        alert(err?.error || "Peixe ja asociado ou ocorreu um erro.");
      }
    } catch (error) {
      console.error("Erro ao selecionar peixe:", error);
    }
  }

  async function handleRemove(businessFishId) {
    if (!window.confirm("Remover este peixe do pesqueiro?")) return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(apiUrl(`/fish/businessFish/${businessFishId}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        loadData();
      } else {
        alert("Erro ao remover peixe.");
      }
    } catch (error) {
      console.error("Erro ao remover peixe:", error);
    }
  }

  const associatedFishNames = businessFishes
    .filter((bf) => bf.fish)
    .map((bf) => bf.fish.name.toLowerCase());
  const availablePeixesJson = peixesData.filter(
    (peixe) => !associatedFishNames.includes(peixe.nome.toLowerCase())
  );

  if (loading) {
    return <div className="text-sm text-blue-700">Carregando peixes...</div>;
  }

  return (
    <div className="w-full mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-blue-900">Peixes Disponiveis</h3>
        {!mode && (
          <div className="flex gap-1">
            {availablePeixesJson.length > 0 && (
              <Button size="sm" variant="outline" onClick={() => setMode("select")}>
                + Adicionar Peixe
              </Button>
            )}
          </div>
        )}
      </div>

      {mode === "select" && (
        <form onSubmit={handleSelectFish} className="bg-white p-4 rounded-lg border border-blue-200 mb-3">
          <div className="grid gap-3">
            <div>
              <label className="block text-xs font-medium mb-1">Selecione um peixe *</label>
              <select
                value={selectedJsonFish}
                onChange={(e) => setSelectedJsonFish(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Escolha...</option>
                {availablePeixesJson.map((peixe) => (
                  <option key={peixe.id} value={peixe.nome}>
                    {peixe.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <Button type="submit" size="sm" className="flex-1">Adicionar</Button>
              <Button type="button" size="sm" variant="outline" onClick={cancelForm}>Cancelar</Button>
            </div>
          </div>
        </form>
      )}

      {businessFishes.length === 0 && !mode && (
        <div className="text-xs text-gray-600">Nenhum peixe cadastrado</div>
      )}

      <div className="flex flex-wrap gap-2">
        {businessFishes.filter((bf) => bf.fish).map((bf) => (
          <div
            key={bf.id}
            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-medium"
          >
            <span>
              {bf.fish.name} {bf.fish.type && `(${bf.fish.type})`}
            </span>
            <button
              type="button"
              onClick={() => handleRemove(bf.id)}
              className="text-red-600 hover:text-red-800 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
