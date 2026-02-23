import { Router } from "express";
import { createPhoto, getPhotos, makeMainPhoto, removePhoto } from "../controllers/photo.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

// Criar foto (upload)
router.post("/photos", upload.single("photo"), createPhoto);

// Listar fotos de um pesqueiro
router.get("/photos/:businessId", getPhotos);

// Definir foto principal
router.patch("/photos/main", makeMainPhoto);

// Deletar foto
router.delete("/photos/:photoId", removePhoto);

export default router;
