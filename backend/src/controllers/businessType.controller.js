import {
  createBusinessTypeService,
  getBusinessTypesService,
} from "../services/businessType.service.js";
import { HttpError } from "../utils/http-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const createBusinessType = asyncHandler(async (req, res) => {
  try {
    const businessType = await createBusinessTypeService(req.body);
    return res.status(201).json(businessType);
  } catch (error) {
    throw new HttpError(400, error.message);
  }
});

export const getBusinessTypes = asyncHandler(async (_req, res) => {
  const businessTypes = await getBusinessTypesService();
  return res.json(businessTypes);
});
