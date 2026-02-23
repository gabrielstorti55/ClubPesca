import { uploadPhoto, listPhotos, deletePhoto } from "../services/photo.service.js";

export async function createPhoto(req, res) {
    try {
        const { businessId } = req.body;
        let url = req.body.url;
        if (req.file) {
            // Usa o buffer do multer em memória
            url = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        }
        const photo = await uploadPhoto({ url, businessId });
        res.status(201).json(photo);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar foto", details: error.message });
    }
}

// Lista todas as fotos de um pesqueiro
export async function getPhotos(req, res) {
    try {
        const { businessId } = req.params;
        const photos = await listPhotos(businessId);
        res.json(photos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar fotos", details: error.message });
    }
}

// Função de foto principal removida pois não é mais necessária

// Deleta uma foto
export async function removePhoto(req, res) {
    try {
        const { photoId } = req.params;
        await deletePhoto(photoId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar foto", details: error.message });
    }
}
