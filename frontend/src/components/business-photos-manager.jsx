import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { apiUrl, assetUrl, authFetch } from "@/lib/api";

const MAX_PHOTOS = 8;

export default function BusinessPhotosManager({ businessId }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!businessId) return;
    loadPhotos();
  }, [businessId]);

  async function loadPhotos() {
    setLoading(true);
    try {
      const res = await fetch(apiUrl(`/photo/photos/${businessId}`));
      const data = await res.json();
      setPhotos(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  async function handleFileSelect(e) {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;

    if (photos.length >= MAX_PHOTOS) {
      setError(`Limite de ${MAX_PHOTOS} fotos por pesqueiro atingido.`);
      return;
    }

    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("businessId", businessId);

    try {
      const res = await authFetch("/photo/photos", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Não foi possível enviar a foto.");
      }

      const novaFoto = await res.json();
      setPhotos((prev) => [...prev, novaFoto]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSetMain(photoId) {
    setError("");
    try {
      const res = await authFetch(`/photo/photos/${photoId}/main`, { method: "PATCH" });
      if (!res.ok) throw new Error("Não foi possível definir a foto principal.");
      await loadPhotos();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleRemove(photoId) {
    setError("");
    try {
      const res = await authFetch(`/photo/photos/${photoId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Não foi possível remover a foto.");
      setPhotos((prev) => prev.filter((p) => p.id !== photoId));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="w-full mt-8">
      <h3 className="text-2xl font-bold mb-2 text-blue-900 tracking-tight flex items-center gap-2">
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7v10a1 1 0 001 1h16a1 1 0 001-1V7M16 3v4M8 3v4m-5 4h18"
          />
        </svg>
        Fotos do Pesqueiro
      </h3>
      <p className="text-sm text-blue-700/70 mb-6">
        {photos.length}/{MAX_PHOTOS} fotos · a foto com estrela é a principal, exibida nos cards
      </p>

      <Separator className="my-8" />

      {error && (
        <div className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-blue-700 text-lg py-8 text-center">Carregando fotos...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-square rounded-2xl overflow-hidden border-2 border-blue-200 bg-white/80 shadow group"
            >
              <img
                src={assetUrl(photo.url)}
                alt="Foto do pesqueiro"
                className="w-full h-full object-cover"
              />

              {photo.isMain && (
                <div
                  className="absolute top-2 left-2 bg-yellow-400 text-white rounded-full p-1 shadow"
                  title="Foto principal"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.783.57-1.838-.196-1.539-1.118l1.287-3.957a1 1 0 00-.363-1.118l-3.371-2.448c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.285-3.957z" />
                  </svg>
                </div>
              )}

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                {!photo.isMain && (
                  <button
                    type="button"
                    onClick={() => handleSetMain(photo.id)}
                    className="bg-white/90 hover:bg-yellow-400 hover:text-white text-yellow-600 rounded-full p-2 shadow"
                    title="Definir como principal"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.783.57-1.838-.196-1.539-1.118l1.287-3.957a1 1 0 00-.363-1.118l-3.371-2.448c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.285-3.957z" />
                    </svg>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(photo.id)}
                  className="bg-white/90 hover:bg-red-500 hover:text-white text-red-500 rounded-full p-2 shadow"
                  title="Remover foto"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {photos.length < MAX_PHOTOS && (
            <label className="aspect-square flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-300 bg-white/60 cursor-pointer hover:bg-blue-50 transition group">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                disabled={uploading}
                className="hidden"
              />
              {uploading ? (
                <span className="text-blue-500 text-sm">Enviando...</span>
              ) : (
                <>
                  <svg
                    className="w-8 h-8 text-blue-300 group-hover:text-blue-500 mb-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-blue-400 text-sm">Adicionar foto</span>
                </>
              )}
            </label>
          )}
        </div>
      )}
    </div>
  );
}
