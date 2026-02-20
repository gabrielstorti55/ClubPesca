import express from 'express'
import { create, getAll } from '../controllers/business.controller.js'
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router()

// Rota RESTful para buscar todos os pesqueiros
router.post('/createBusiness', authenticateToken, create)
router.get('/getAll', getAll)

export default router