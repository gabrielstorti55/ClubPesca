import BusinessEditForm from "@/components/business-edit-form";
import BusinessPhotosManager from "@/components/business-photos-manager";
import { Separator } from "@/components/ui/separator";

export default function ProfileBusinessPanel({
  loading,
  businesses,
  onBusinessSave,
}) {
  if (loading) {
    return (
      <div className="flex flex-col items-center w-full animate-fade-in">
        <div className="text-blue-700 text-lg py-8">Carregando pesqueiros...</div>
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <div className="flex flex-col items-center w-full animate-fade-in">
        <div className="text-blue-800 py-8">
          Voce ainda nao possui pesqueiros cadastrados.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full animate-fade-in">
      {businesses.map((business) => (
        <div
          key={business.id}
          className="mb-10 w-full bg-blue-50/60 rounded-2xl p-6 shadow border border-blue-100"
        >
          <h2 className="text-xl font-bold text-blue-900 mb-2">{business.name}</h2>
          <p className="text-blue-700 text-sm mb-2">{business.description}</p>
          <p className="text-blue-700 text-sm mb-2">
            Telefone: {business.phone || "-"}
          </p>
          <p className="text-blue-700 text-sm mb-2">
            Endereco: {business.address?.street}, {business.address?.number} -{" "}
            {business.address?.city}/{business.address?.state}
          </p>

          <BusinessPhotosManager businessId={business.id} />

          <div className="w-full mt-4 mb-2">
            <BusinessEditForm business={business} onSave={onBusinessSave} />
          </div>
          <Separator className="my-6 w-full" />
        </div>
      ))}
    </div>
  );
}
