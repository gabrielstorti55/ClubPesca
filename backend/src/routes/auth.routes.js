import express from 'express'
import { register, login } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/cadastro', register)
router. post('/login', login)
// router.post('/home')

export default router