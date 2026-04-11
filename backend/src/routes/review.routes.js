import express from 'express'
import { create, getByBusinessId, getAverage, update, deleteReviewById } from '../controllers/review.controller.js'
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router()

router.post('/', authenticateToken, create)
router.get('/business/:businessId', getByBusinessId)
router.get('/business/:businessId/average', getAverage)
router.patch('/:id', authenticateToken, update)
router.delete('/:id', authenticateToken, deleteReviewById)

export default router
