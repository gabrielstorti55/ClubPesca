import { deletePhoto, listPhotos, uploadPhoto } from "../services/photo.service.js";
import { HttpError } from "../utils/http-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const createPhoto = asyncHandler(async (req, res) => {
  const { businessId } = req.body;
  let url = req.body.url;

  if (req.file) {
    url = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
  }

  if (!url || !businessId) {
    throw new HttpError(400, "Dados obrigatorios da foto nao informados");
  }

  const photo = await uploadPhoto({ url, businessId });
  return res.status(201).json(photo);
});

export const getPhotos = asyncHandler(async (req, res) => {
  const photos = await listPhotos(req.params.businessId);
  return res.json(photos);
});

export const removePhoto = asyncHandler(async (req, res) => {
  await deletePhoto(req.params.photoId);
  return res.status(204).send();
});
