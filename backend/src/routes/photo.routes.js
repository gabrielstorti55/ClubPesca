import { Router } from "express";
import { createPhoto, getPhotos, removePhoto, updateMainPhoto } from "../controllers/photo.controller.js";
import upload from "../middleware/upload.middleware.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

// Criar foto (upload)
router.post("/photos", authenticateToken, upload.single("photo"), createPhoto);

// Listar fotos de um pesqueiro
router.get("/photos/:businessId", getPhotos);

// Definir foto principal
router.patch("/photos/:photoId/main", authenticateToken, updateMainPhoto);

// Deletar foto
router.delete("/photos/:photoId", authenticateToken, removePhoto);

export default router;
