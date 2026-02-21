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
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3000/business/${business.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
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
      <Separator className="my-2" />
      <Button type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar Alterações"}</Button>
      {success && <span className="text-green-600 text-sm">Alterações salvas!</span>}
    </form>
  );
}
