import {
  createAddressService,
  getAddressByIdService,
  getAddressesService,
} from "../services/address.service.js";
import { HttpError } from "../utils/http-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const createAddress = asyncHandler(async (req, res) => {
  try {
    const address = await createAddressService({
      ...req.body,
      userId: req.userId,
    });

    return res.status(201).json(address);
  } catch (error) {
    throw new HttpError(400, error.message);
  }
});

export const getAddresses = asyncHandler(async (_req, res) => {
  const addresses = await getAddressesService();
  return res.json(addresses);
});

export const getAddressById = asyncHandler(async (req, res) => {
  const address = await getAddressByIdService(req.params.id);
  if (!address) {
    throw new HttpError(404, "Endereco nao encontrado");
  }

  return res.json(address);
});
