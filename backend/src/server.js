import express from 'express'
import authRoutes from './routes/auth.routes.js'
import 'dotenv/config'

const app = express()

app.use(express.json())

app.use('/auth', authRoutes)

app.listen(3000, () => {
  console.log('Servidor rodando')
})
