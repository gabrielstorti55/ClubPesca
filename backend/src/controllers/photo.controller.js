import { deletePhoto, listPhotos, setMainPhoto, uploadPhoto } from "../services/photo.service.js";
import { HttpError } from "../utils/http-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const createPhoto = asyncHandler(async (req, res) => {
  const { businessId } = req.body;

  if (!businessId) {
    throw new HttpError(400, "businessId é obrigatório");
  }

  const photo = await uploadPhoto({ file: req.file, businessId });
  return res.status(201).json(photo);
});

export const getPhotos = asyncHandler(async (req, res) => {
  const photos = await listPhotos(req.params.businessId);
  return res.json(photos);
});

export const updateMainPhoto = asyncHandler(async (req, res) => {
  const photo = await setMainPhoto(req.params.photoId);
  return res.json(photo);
});

export const removePhoto = asyncHandler(async (req, res) => {
  await deletePhoto(req.params.photoId);
  return res.status(204).send();
});
