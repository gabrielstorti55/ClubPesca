import express from 'express'
import { register, login, me, logout } from '../controllers/auth.controller.js'
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router()

router.post('/cadastro', register)
router.post('/login', login)
router.get('/me', authenticateToken, me);
router.post('/logout', logout);
// router.post('/home')
export default router