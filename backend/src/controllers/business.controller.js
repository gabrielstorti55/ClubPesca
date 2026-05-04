import {
  createBusiness,
  getAllBusinesses,
  getBusinessesByUserId,
  updateBusinesses,
  deleteBusinesses,
} from "../services/business.service.js";
import { getUserById } from "../services/auth.service.js";
import { HttpError } from "../utils/http-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const create = asyncHandler(async (req, res) => {
  try {
    const user = await getUserById(req.userId);
    if (!user || (user.role !== 'OWNER' && user.role !== 'ADMIN')) {
      throw new HttpError(403, "Apenas usuários com o título de dono ou administrador podem criar um pesqueiro.");
    }

    const business = await createBusiness({
      ...req.body,
      ownerId: req.userId,
    });

    return res.status(201).json(business);
  } catch (error) {
    throw new HttpError(400, error.message);
  }
});

export const getAll = asyncHandler(async (req, res) => {
  const businesses = req.userId
    ? await getBusinessesByUserId(req.userId)
    : await getAllBusinesses();

  return res.json(businesses);
});

export const update = asyncHandler(async (req, res) => {
  try {
    const updatedBusiness = await updateBusinesses(req.params.id, req.body);
    return res.json(updatedBusiness);
  } catch (error) {
    throw new HttpError(400, error.message);
  }
});

export const deleteBusiness = asyncHandler(async (req, res) => {
  try {
    await deleteBusinesses(req.params.id);
    return res.status(204).send();
  } catch (error) {
    throw new HttpError(400, error.message);
  }
});
