import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function BusinessPhotosManager({ businessId }) {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!businessId) return;
    fetch(`http://localhost:3000/photo/photos/${businessId}`)
      .then(res => res.json())
      .then(setPhotos);
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
      setPhotos(p => [...p, novaFoto]);
    }
    setLoading(false);
  }

  async function handleSetMain(photoId) {
    setLoading(true);
    const token = localStorage.getItem("token");
    await fetch("http://localhost:3000/photo/photos/main", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ photoId, businessId })
    });
    setPhotos(p => p.map(f => ({ ...f, isMain: f.id === photoId })));
    setLoading(false);
  }

  async function handleDelete(photoId) {
    setLoading(true);
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:3000/photo/photos/${photoId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    setPhotos(p => p.filter(f => f.id !== photoId));
    setLoading(false);
  }

  return (
    <div className="w-full mt-6">
      <h3 className="text-lg font-semibold mb-4">Fotos do Pesqueiro</h3>
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <input
          type="file"
          accept="image/*"
          onChange={e => {
            const f = e.target.files[0];
            setFile(f);
            setPreview(f ? URL.createObjectURL(f) : "");
          }}
          className="flex-1 border-2 border-blue-300 rounded-lg px-3 py-2 shadow focus:border-blue-500 transition"
        />
        {preview && (
          <img src={preview} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-blue-200" />
        )}
        <Button onClick={handleUpload} disabled={loading || !file} className="px-6 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition">
          Adicionar
        </Button>
      </div>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map(photo => (
          <div key={photo.id} className={`relative border-2 rounded-xl p-4 flex flex-col items-center shadow-lg bg-white ${photo.isMain ? 'border-blue-600' : 'border-gray-200'}`}>
            <img
              src={photo.url.startsWith('/uploads') ? `http://localhost:3000${photo.url}` : photo.url}
              alt="Foto"
              className="w-44 h-44 object-cover rounded-xl mb-3 border-2 border-blue-200 bg-gray-100"
              style={{ boxShadow: photo.isMain ? '0 0 0 4px #2563eb' : undefined }}
            />
            {photo.isMain && (
              <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">Principal</span>
            )}
            <div className="flex gap-3 mt-2 w-full justify-center">
              <Button size="sm" variant="secondary" onClick={() => handleSetMain(photo.id)} disabled={photo.isMain || loading} className="rounded-lg">
                Definir Principal
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(photo.id)} disabled={loading} className="rounded-lg">
                Deletar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
