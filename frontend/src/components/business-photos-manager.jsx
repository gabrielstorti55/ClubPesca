import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function BusinessPhotosManager({ businessId }) {
  const [photos, setPhotos] = useState([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!businessId) return;
    fetch(`http://localhost:3000/photo/photos/${businessId}`)
      .then(res => res.json())
      .then(setPhotos);
  }, [businessId]);

  async function handleUpload() {
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3000/photo/photos", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ url, businessId })
    });
    if (res.ok) {
      setUrl("");
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
      <h3 className="text-lg font-semibold mb-2">Fotos do Pesqueiro</h3>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="URL da foto"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
        />
        <Button onClick={handleUpload} disabled={loading || !url}>
          Adicionar
        </Button>
      </div>
      <Separator className="my-4" />
      <div className="grid grid-cols-2 gap-4">
        {photos.map(photo => (
          <div key={photo.id} className="relative border rounded p-2 flex flex-col items-center">
            <img src={photo.url} alt="Foto" className="w-32 h-32 object-cover rounded mb-2" />
            {photo.isMain && (
              <span className="text-xs text-blue-700 font-bold mb-1">Principal</span>
            )}
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => handleSetMain(photo.id)} disabled={photo.isMain || loading}>
                Definir Principal
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(photo.id)} disabled={loading}>
                Deletar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
