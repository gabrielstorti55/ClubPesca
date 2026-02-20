import express from 'express';
import { createBusinessType, getBusinessTypes } from '../controllers/businessType.controller.js';

const router = express.Router();

router.post('/create', createBusinessType);
router.get('/', getBusinessTypes);

export default router;
