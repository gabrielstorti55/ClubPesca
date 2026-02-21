import { Router } from "express";
import { createPhoto, getPhotos, makeMainPhoto, removePhoto } from "../controllers/photo.controller.js";

const router = Router();

// Criar foto
router.post("/photos", createPhoto);

// Listar fotos de um pesqueiro
router.get("/photos/:businessId", getPhotos);

// Definir foto principal
router.patch("/photos/main", makeMainPhoto);

// Deletar foto
router.delete("/photos/:photoId", removePhoto);

export default router;
