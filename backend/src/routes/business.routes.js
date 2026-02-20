import express from 'express'
import { create } from '../controllers/business.controller.js'
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router()

router.post('/createBusiness', authenticateToken, create)

export default router