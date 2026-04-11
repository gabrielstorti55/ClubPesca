import {
  createOffer,
  getOffersByBusinessId,
  updateOffer,
  deleteOffer,
} from "../services/offer.service.js";
import { HttpError } from "../utils/http-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const create = asyncHandler(async (req, res) => {
  try {
    const offer = await createOffer(req.body);
    return res.status(201).json(offer);
  } catch (error) {
    throw new HttpError(400, error.message);
  }
});

export const getByBusinessId = asyncHandler(async (req, res) => {
  const offers = await getOffersByBusinessId(req.params.businessId);
  return res.json(offers);
});

export const update = asyncHandler(async (req, res) => {
  try {
    const updatedOffer = await updateOffer(req.params.id, req.body);
    return res.json(updatedOffer);
  } catch (error) {
    throw new HttpError(400, error.message);
  }
});

export const deleteOfferById = asyncHandler(async (req, res) => {
  try {
    await deleteOffer(req.params.id);
    return res.status(204).send();
  } catch (error) {
    throw new HttpError(400, error.message);
  }
});
