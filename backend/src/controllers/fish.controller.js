import {
  createFish,
  getAllFish,
  updateFish,
  deleteFish,
  addFishToBusiness,
  getFishesByBusinessId,
  removeFishFromBusiness,
} from "../services/fish.service.js";
import { HttpError } from "../utils/http-error.js";
import { asyncHandler } from "../utils/async-handler.js";

// CRUD de peixes (catálogo geral)
export const create = asyncHandler(async (req, res) => {
  const { name, type } = req.body;

  if (!name) {
    throw new HttpError(400, "Nome do peixe e obrigatorio");
  }

  try {
    const data = { name };
    if (type) data.type = type;

    const fish = await createFish(data);
    return res.status(201).json(fish);
  } catch (error) {
    throw new HttpError(400, error.message);
  }
});

export const getAll = asyncHandler(async (req, res) => {
  const fishes = await getAllFish();
  return res.json(fishes);
});

export const update = asyncHandler(async (req, res) => {
  try {
    const updatedFish = await updateFish(req.params.id, req.body);
    return res.json(updatedFish);
  } catch (error) {
    throw new HttpError(400, error.message);
  }
});

export const deleteFishById = asyncHandler(async (req, res) => {
  try {
    await deleteFish(req.params.id);
    return res.status(204).send();
  } catch (error) {
    throw new HttpError(400, error.message);
  }
});

// Associação de peixes a negócios
export const addToBusinessId = asyncHandler(async (req, res) => {
  const { businessId } = req.params;
  const { fishId } = req.body;

  if (!fishId) {
    throw new HttpError(400, "fishId e obrigatorio");
  }

  try {
    const businessFish = await addFishToBusiness(businessId, fishId);
    return res.status(201).json(businessFish);
  } catch (error) {
    throw new HttpError(400, error.message);
  }
});

export const getByBusinessId = asyncHandler(async (req, res) => {
  const fishes = await getFishesByBusinessId(req.params.businessId);
  return res.json(fishes);
});

export const removeFromBusiness = asyncHandler(async (req, res) => {
  try {
    await removeFishFromBusiness(req.params.businessFishId);
    return res.status(204).send();
  } catch (error) {
    throw new HttpError(400, error.message);
  }
});
