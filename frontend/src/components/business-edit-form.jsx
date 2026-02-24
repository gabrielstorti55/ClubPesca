import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function BusinessEditForm({ business, onSave }) {
  const [form, setForm] = useState({
    name: business.name || "",
    description: business.description || "",
    phone: business.phone || "",
    website: business.website || "",
    openingTime: business.openingTime || "",
    closingTime: business.closingTime || "",
    openDays: business.openDays || [], // array de strings: ['segunda', 'terça', ...]
  });

  const diasSemana = [
    { label: 'Dom', value: 'domingo' },
    { label: 'Seg', value: 'segunda' },
    { label: 'Ter', value: 'terca' },
    { label: 'Qua', value: 'quarta' },
    { label: 'Qui', value: 'quinta' },
    { label: 'Sex', value: 'sexta' },
    { label: 'Sáb', value: 'sabado' },
  ];
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleDayToggle(day) {
    setForm(f => ({
      ...f,
      openDays: f.openDays.includes(day)
        ? f.openDays.filter(d => d !== day)
        : [...f.openDays, day]
    }));
  }

  function normalizaDia(dia) {
    return dia
      .toLowerCase()
      .replace('á', 'a').replace('ã', 'a').replace('â', 'a')
      .replace('é', 'e').replace('ê', 'e')
      .replace('í', 'i')
      .replace('ó', 'o').replace('ô', 'o')
      .replace('ú', 'u')
      .replace('ç', 'c');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    const token = localStorage.getItem("token");
    // Normaliza os dias antes de enviar
    const formToSend = {
      ...form,
      openDays: (form.openDays || []).map(normalizaDia)
    };
    const res = await fetch(`http://localhost:3000/business/${business.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formToSend)
    });
    setSaving(false);
    if (res.ok) {
      setSuccess(true);
      if (onSave) onSave();
    }
  }

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Nome do Pesqueiro</label>
        <Input name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Descrição</label>
        <Input name="description" value={form.description} onChange={handleChange} required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Telefone</label>
        <Input name="phone" value={form.phone} onChange={handleChange} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Website</label>
        <Input name="website" value={form.website} onChange={handleChange} />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Horário de abertura</label>
          <Input type="time" name="openingTime" value={form.openingTime} onChange={handleChange} />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Horário de fechamento</label>
          <Input type="time" name="closingTime" value={form.closingTime} onChange={handleChange} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 mt-2">Dias de funcionamento</label>
        <div className="flex flex-wrap gap-2">
          {diasSemana.map(dia => (
            <button
              type="button"
              key={dia.value}
              className={`px-3 py-1 rounded border text-xs font-medium transition ${form.openDays.includes(dia.value) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-700 border-blue-300'}`}
              onClick={() => handleDayToggle(dia.value)}
            >
              {dia.label}
            </button>
          ))}
        </div>
      </div>
      <Separator className="my-2" />
      <Button type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar Alterações"}</Button>
      {success && <span className="text-green-600 text-sm">Alterações salvas!</span>}
    </form>
  );
}
