import { uploadPhoto, listPhotos, setMainPhoto, deletePhoto } from "../services/photo.service.js";

// Cria uma nova foto para o pesqueiro
export async function createPhoto(req, res) {
    try {
        const { url, businessId, isMain, order } = req.body;
        const photo = await uploadPhoto({ url, businessId, isMain, order });
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

// Define uma foto como principal
export async function makeMainPhoto(req, res) {
    try {
        const { photoId, businessId } = req.body;
        const photo = await setMainPhoto(photoId, businessId);
        res.json(photo);
    } catch (error) {
        res.status(500).json({ error: "Erro ao definir foto principal", details: error.message });
    }
}

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
