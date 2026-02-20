import { createBusinessTypeService, getBusinessTypesService } from '../services/businessType.service.js';

export async function createBusinessType(req, res) {
  try {
    const businessType = await createBusinessTypeService(req.body);
    res.status(201).json(businessType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getBusinessTypes(req, res) {
  try {
    const businessTypes = await getBusinessTypesService();
    res.json(businessTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
