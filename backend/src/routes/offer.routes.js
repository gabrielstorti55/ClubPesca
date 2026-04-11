import express from 'express'
import { create, getByBusinessId, update, deleteOfferById } from '../controllers/offer.controller.js'
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router()

router.post('/', authenticateToken, create)
router.get('/business/:businessId', getByBusinessId)
router.patch('/:id', authenticateToken, update)
router.delete('/:id', authenticateToken, deleteOfferById)

export default router
