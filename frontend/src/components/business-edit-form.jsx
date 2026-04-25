import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { apiUrl } from "@/lib/api";
import EstadoCidadeSelect from "@/components/estado-cidade-select";

const DAYS_OF_WEEK = [
  { label: "Dom", value: "domingo" },
  { label: "Seg", value: "segunda" },
  { label: "Ter", value: "terca" },
  { label: "Qua", value: "quarta" },
  { label: "Qui", value: "quinta" },
  { label: "Sex", value: "sexta" },
  { label: "Sab", value: "sabado" },
];

function normalizeDay(day) {
  return (day || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");
}

export default function BusinessEditForm({ business, onSave }) {
  const initialForm = useMemo(
    () => ({
      name: business.name || "",
      description: business.description || "",
      phone: business.phone || "",
      whatsapp: business.whatsapp || "",
      website: business.website || "",
      openingTime: business.openingTime || "",
      closingTime: business.closingTime || "",
      openDays: business.openDays || [],
      typeId: business.typeId || "",
      street: business.address?.street || "",
      number: business.address?.number || "",
      zipCode: business.address?.zipCode || "",
      city: business.address?.city || "",
      state: business.address?.state || "",
    }),
    [business]
  );

  const [form, setForm] = useState(initialForm);
  const [types, setTypes] = useState([]);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchTypes() {
      try {
        const response = await fetch(apiUrl("/businessType"));
        if (response.ok) {
          const data = await response.json();
          setTypes(data);
        }
      } catch (err) {
        console.error("Erro ao buscar tipos:", err);
      }
    }
    fetchTypes();
  }, []);

  function handleChange(e) {
    const value = e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
    setForm((prev) => ({ ...prev, [e.target.name]: value }));
  }

  function handleDayToggle(day) {
    setForm((prev) => ({
      ...prev,
      openDays: prev.openDays.includes(day)
        ? prev.openDays.filter((currentDay) => currentDay !== day)
        : [...prev.openDays, day],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    const token = localStorage.getItem("token");
    const formToSend = {
      ...form,
      openDays: (form.openDays || []).map(normalizeDay),
    };

    const response = await fetch(apiUrl(`/business/${business.id}`), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formToSend),
    });

    setSaving(false);

    if (response.ok) {
      setSuccess(true);
      if (onSave) onSave();
    }
  }

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Nome do Pesqueiro *</label>
        <Input name="name" value={form.name} onChange={handleChange} required />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descricao *</label>
        <Input
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tipo de Negocio *</label>
        <select
          name="typeId"
          value={form.typeId}
          onChange={handleChange}
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Selecione um tipo</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <Separator />
      <h4 className="text-md font-semibold text-blue-900">Endereco</h4>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Rua *</label>
          <Input name="street" value={form.street} onChange={handleChange} required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Numero *</label>
          <Input
            type="number"
            name="number"
            value={form.number}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">CEP *</label>
          <Input name="zipCode" value={form.zipCode} onChange={handleChange} required />
        </div>

        <div className="col-span-2">
          <EstadoCidadeSelect
            onChange={({ estado, cidade }) => {
              setForm((prev) => ({
                ...prev,
                state: estado,
                city: cidade,
              }));
            }}
            initialEstado={form.state}
            initialCidade={form.city}
          />
        </div>
      </div>

      <Separator />
      <h4 className="text-md font-semibold text-blue-900">Contato</h4>

      <div>
        <label className="block text-sm font-medium mb-1">Telefone</label>
        <Input name="phone" value={form.phone} onChange={handleChange} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">WhatsApp</label>
        <Input
          name="whatsapp"
          value={form.whatsapp}
          onChange={handleChange}
          placeholder="(11) 99999-9999"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Website</label>
        <Input name="website" value={form.website} onChange={handleChange} />
      </div>

      <Separator />
      <h4 className="text-md font-semibold text-blue-900">Horario de Funcionamento</h4>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Abertura</label>
          <Input
            type="time"
            name="openingTime"
            value={form.openingTime}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Fechamento</label>
          <Input
            type="time"
            name="closingTime"
            value={form.closingTime}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 mt-2">Dias de funcionamento</label>
        <div className="flex flex-wrap gap-2">
          {DAYS_OF_WEEK.map((day) => (
            <button
              type="button"
              key={day.value}
              className={`px-3 py-1 rounded border text-xs font-medium transition ${
                form.openDays.includes(day.value)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-700 border-blue-300"
              }`}
              onClick={() => handleDayToggle(day.value)}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>

      <Separator className="my-2" />

      <Button type="submit" disabled={saving}>
        {saving ? "Salvando..." : "Salvar Alteracoes"}
      </Button>
      {success && <span className="text-green-600 text-sm">Alteracoes salvas!</span>}
    </form>
  );
}
