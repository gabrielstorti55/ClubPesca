import express from 'express';
import { createAddress, getAddresses, getAddressById } from '../controllers/address.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create', authenticateToken, createAddress);
router.get('/', getAddresses);
router.get('/:id', getAddressById);

export default router;
