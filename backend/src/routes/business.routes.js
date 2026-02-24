import express from 'express'
import { create, getAll, update } from '../controllers/business.controller.js'
import { attachUserIfPresent, authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router()

// Rota RESTful para buscar todos os pesqueiros

router.post('/createBusiness', authenticateToken, create)
router.get('/getAll', attachUserIfPresent, getAll)
router.patch('/:id', authenticateToken, update)

export default router
