
import { createAddressService, getAddressesService, getAddressByIdService } from '../services/address.service.js';

export async function createAddress(req, res) {
  try {
    // Vincula o endereço ao usuário logado
    const data = {
      ...req.body,
      userId: req.userId // userId vem do authenticateToken
    };
    const address = await createAddressService(data);
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


export async function getAddresses(req, res) {
  try {
    const addresses = await getAddressesService();
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export async function getAddressById(req, res) {
  try {
    const address = await getAddressByIdService(req.params.id);
    if (!address) return res.status(404).json({ error: 'Endereço não encontrado' });
    res.json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
