import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiUrl } from "@/lib/api";

const OFFER_TYPES = [
  { value: "entrada", label: "Entrada" },
  { value: "aluguel", label: "Aluguel" },
  { value: "produto", label: "Produto" },
  { value: "servico", label: "Servico" },
];

export default function BusinessOffersManager({ businessId }) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    type: "entrada",
  });

  useEffect(() => {
    loadOffers();
  }, [businessId]);

  async function loadOffers() {
    setLoading(true);
    try {
      const response = await fetch(apiUrl(`/offer/business/${businessId}`));
      if (response.ok) {
        const data = await response.json();
        setOffers(data);
      }
    } catch (error) {
      console.error("Erro ao carregar ofertas:", error);
    }
    setLoading(false);
  }

  function handleChange(e) {
    const value = e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
    setForm((prev) => ({ ...prev, [e.target.name]: value }));
  }

  function startEdit(offer) {
    setForm({
      name: offer.name,
      description: offer.description || "",
      price: offer.price.toString(),
      type: offer.type,
    });
    setEditingId(offer.id);
    setShowForm(true);
  }

  function cancelForm() {
    setForm({ name: "", description: "", price: "", type: "entrada" });
    setEditingId(null);
    setShowForm(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const url = editingId
      ? apiUrl(`/offer/${editingId}`)
      : apiUrl("/offer");

    const method = editingId ? "PATCH" : "POST";

    const body = editingId
      ? form
      : { ...form, businessId, active: true };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        cancelForm();
        loadOffers();
      }
    } catch (error) {
      console.error("Erro ao salvar oferta:", error);
    }
  }

  async function handleDelete(offerId) {
    if (!window.confirm("Tem certeza que deseja deletar esta oferta?")) {
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(apiUrl(`/offer/${offerId}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        loadOffers();
      }
    } catch (error) {
      console.error("Erro ao deletar oferta:", error);
    }
  }

  if (loading) {
    return <div className="text-sm text-blue-700">Carregando ofertas...</div>;
  }

  return (
    <div className="w-full mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-blue-900">Precos e Ofertas</h3>
        {!showForm && (
          <Button size="sm" variant="outline" onClick={() => setShowForm(true)}>
            + Adicionar
          </Button>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-lg border border-blue-200 mb-3"
        >
          <div className="grid gap-3">
            <div>
              <label className="block text-xs font-medium mb-1">Nome *</label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Ex: Entrada adulto"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">Descricao</label>
              <Input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Opcional"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium mb-1">Preco (R$) *</label>
                <Input
                  type="number"
                  step="0.01"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Tipo *</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {OFFER_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" size="sm" className="flex-1">
                {editingId ? "Salvar" : "Adicionar"}
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={cancelForm}>
                Cancelar
              </Button>
            </div>
          </div>
        </form>
      )}

      {offers.length === 0 && !showForm && (
        <div className="text-xs text-gray-600">Nenhuma oferta cadastrada</div>
      )}

      <div className="space-y-2">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex justify-between items-center p-2 bg-white rounded border border-blue-100"
          >
            <div className="flex-1">
              <div className="text-sm font-medium text-blue-900">{offer.name}</div>
              {offer.description && (
                <div className="text-xs text-gray-600">{offer.description}</div>
              )}
              <div className="text-xs text-gray-500">
                <span className="font-semibold text-green-700">
                  R$ {offer.price.toFixed(2)}
                </span>
                {" • "}
                {OFFER_TYPES.find((t) => t.value === offer.type)?.label || offer.type}
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => startEdit(offer)}
                className="text-xs h-7"
              >
                Editar
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDelete(offer.id)}
                className="text-xs h-7 text-red-600 hover:text-red-700"
              >
                Deletar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
