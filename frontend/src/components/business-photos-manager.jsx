  import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function BusinessPhotosManager({ businessId }) {
  // Debug: mostrar fotos carregadas
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!businessId) return;
    fetch(`http://localhost:3000/photo/photos/${businessId}`)
      .then(res => res.json())
      .then(fotos => {
        // Ordena por createdAt ou id decrescente para garantir que a última seja exibida
        let ordered = fotos;
        if (Array.isArray(fotos) && fotos.length > 1) {
          if (fotos[0].createdAt) {
            ordered = fotos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          } else if (fotos[0].id) {
            ordered = fotos.sort((a, b) => b.id - a.id);
          }
        }
        setPhotos(ordered && ordered.length ? [ordered[0]] : []);
      });
  }, [businessId]);

  async function handleUpload() {
    if (!file) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("businessId", businessId);
    const res = await fetch("http://localhost:3000/photo/photos", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    if (res.ok) {
      setFile(null);
      setPreview("");
      const novaFoto = await res.json();
      setPhotos([novaFoto]); // Sempre substitui a foto
    }
    setLoading(false);
  }

  // Não precisa mais de set main ou delete

  return (
    <div className="w-full mt-8">
      <h3 className="text-2xl font-bold mb-6 text-blue-900 tracking-tight flex items-center gap-2">
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a1 1 0 001 1h16a1 1 0 001-1V7M16 3v4M8 3v4m-5 4h18" /></svg>
        Fotos do Pesqueiro
      </h3>
      {/* Seção de adicionar nova foto removida */}
      <Separator className="my-8" />
      {loading && (
        <div className="text-blue-700 text-lg py-8 text-center">Carregando fotos...</div>
      )}
      <div className="flex justify-center">
        <div className="relative w-48 h-48 flex items-center justify-center border-2 border-blue-200 rounded-2xl bg-white/80 shadow-xl backdrop-blur-xl transition-all duration-200">
          {photos.length > 0 && photos[0].url ? (
            <>
              <img
                src={photos[0].url.startsWith('data:') ? photos[0].url : `http://localhost:3000${photos[0].url}`}
                alt="Logo do Pesqueiro"
                className="w-full h-full object-cover rounded-2xl"
                style={{ boxShadow: '0 0 0 4px #2563eb33' }}
              />
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setPreview("");
                  setPhotos([]);
                }}
                className="absolute top-2 right-2 bg-white/80 hover:bg-blue-600 hover:text-white text-blue-600 rounded-full p-1 shadow transition z-10 border border-blue-100"
                title="Alterar logo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 11l6 6M3 17v4h4l11-11a2.828 2.828 0 10-4-4L3 17z" /></svg>
              </button>
            </>
          ) : preview ? (
            <>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-2xl animate-fade-in"
              />
              <button
                type="button"
                onClick={() => { setFile(null); setPreview(""); }}
                className="absolute top-2 right-2 bg-white/80 hover:bg-red-500 hover:text-white text-red-500 rounded-full p-1 shadow transition z-10 border border-red-100"
                title="Remover preview"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <Button
                type="button"
                onClick={handleUpload}
                disabled={loading || !file}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg z-10"
              >
                <span className="flex items-center gap-2 justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  Salvar
                </span>
              </Button>
            </>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer group">
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const f = e.target.files[0];
                  setFile(f);
                  setPreview(f ? URL.createObjectURL(f) : "");
                }}
                className="hidden"
              />
              <svg className="w-12 h-12 text-blue-300 group-hover:text-blue-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              <span className="text-blue-400 text-sm">Adicionar logo</span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
