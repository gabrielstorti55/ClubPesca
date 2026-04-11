import BusinessEditForm from "@/components/business-edit-form";
import BusinessCreateForm from "@/components/business-create-form";
import BusinessPhotosManager from "@/components/business-photos-manager";
import BusinessOffersManager from "@/components/business-offers-manager";
import BusinessFishManager from "@/components/business-fish-manager";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { apiUrl } from "@/lib/api";

export default function ProfileBusinessPanel({
  loading,
  businesses,
  onBusinessSave,
}) {
  const [deleting, setDeleting] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  async function handleDelete(businessId, businessName) {
    if (
      !window.confirm(
        `Tem certeza que deseja deletar o pesqueiro "${businessName}"? Esta acao nao pode ser desfeita.`
      )
    ) {
      return;
    }

    setDeleting(businessId);

    const token = localStorage.getItem("token");
    const response = await fetch(apiUrl(`/business/${businessId}`), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setDeleting(null);

    if (response.ok) {
      if (onBusinessSave) onBusinessSave();
    } else {
      alert("Erro ao deletar pesqueiro. Tente novamente.");
    }
  }

  function handleCreateSuccess() {
    setShowCreateForm(false);
    if (onBusinessSave) onBusinessSave();
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center w-full animate-fade-in">
        <div className="text-blue-700 text-lg py-8">Carregando pesqueiros...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full animate-fade-in">
      {!showCreateForm && (
        <div className="w-full mb-6">
          <Button
            onClick={() => setShowCreateForm(true)}
            className="w-full"
            size="lg"
          >
            + Adicionar Novo Pesqueiro
          </Button>
        </div>
      )}

      {showCreateForm && (
        <div className="w-full mb-8 bg-blue-50/60 rounded-2xl p-6 shadow border border-blue-100">
          <BusinessCreateForm
            onSave={handleCreateSuccess}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      {businesses.length === 0 && !showCreateForm && (
        <div className="text-blue-800 py-8">
          Voce ainda nao possui pesqueiros cadastrados.
        </div>
      )}

      {businesses.map((business) => (
        <div
          key={business.id}
          className="mb-10 w-full bg-blue-50/60 rounded-2xl p-6 shadow border border-blue-100"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-xl font-bold text-blue-900">{business.name}</h2>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(business.id, business.name)}
              disabled={deleting === business.id}
            >
              {deleting === business.id ? "Deletando..." : "Deletar"}
            </Button>
          </div>
          <p className="text-blue-700 text-sm mb-2">{business.description}</p>
          <p className="text-blue-700 text-sm mb-2">
            Telefone: {business.phone || "-"}
          </p>
          <p className="text-blue-700 text-sm mb-2">
            Endereco: {business.address?.street}, {business.address?.number} -{" "}
            {business.address?.city}/{business.address?.state}
          </p>

          <BusinessPhotosManager businessId={business.id} />

          <BusinessOffersManager businessId={business.id} />

          <BusinessFishManager businessId={business.id} />

          <div className="w-full mt-4 mb-2">
            <BusinessEditForm business={business} onSave={onBusinessSave} />
          </div>
          <Separator className="my-6 w-full" />
        </div>
      ))}
    </div>
  );
}
