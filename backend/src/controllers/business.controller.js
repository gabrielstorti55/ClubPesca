import { createBusiness } from "../services/business.service.js"

export async function create(req, res) {
  try {
    // Vincula o business ao usuário logado
    const data = {
      ...req.body,
      ownerId: req.userId // userId vem do authenticateToken
    };
    const business = await createBusiness(data);
    return res.status(201).json(business);
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
}