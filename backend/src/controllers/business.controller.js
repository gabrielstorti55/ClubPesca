import { createBusiness, getAllBusinesses, updateBusinesses, getBusinessesByUserId } from "../services/business.service.js"

export async function create(req, res) {
  try {
    const data = {
      ...req.body,
      ownerId: req.userId 
    };
    const business = await createBusiness(data);
    return res.status(201).json(business);
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
}


export async function getAll(req, res) {
  try {
    // Se o usuário está autenticado, retorna só os pesqueiros dele
    if (req.userId) {
      const businesses = await getBusinessesByUserId(req.userId);
      return res.json(businesses);
    }
    // Caso contrário, retorna todos
    const businesses = await getAllBusinesses();
    return res.json(businesses);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function update(req, res) {
  try {
    const updated = await updateBusinesses(req.params.id, req.body);
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}