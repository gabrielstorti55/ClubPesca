import express from 'express'
import {
  create,
  getAll,
  update,
  deleteFishById,
  addToBusinessId,
  getByBusinessId,
  removeFromBusiness,
} from '../controllers/fish.controller.js'
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router()

// CRUD de peixes (catálogo geral)
router.post('/', authenticateToken, create)
router.get('/', getAll)
router.patch('/:id', authenticateToken, update)
router.delete('/:id', authenticateToken, deleteFishById)

// Associação de peixes a negócios
router.post('/business/:businessId', authenticateToken, addToBusinessId)
router.get('/business/:businessId', getByBusinessId)
router.delete('/businessFish/:businessFishId', authenticateToken, removeFromBusiness)

export default router
