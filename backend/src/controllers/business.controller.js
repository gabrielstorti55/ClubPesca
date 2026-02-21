import { createBusiness, getAllBusinesses, updateBusinesses } from "../services/business.service.js"

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