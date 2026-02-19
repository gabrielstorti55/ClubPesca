import express from 'express'
import authRoutes from './routes/auth.routes.js'
import 'dotenv/config'
import cors from 'cors'


const app = express()

app.use(cors());
app.use(express.json())
app.use('/auth', authRoutes)

app.listen(3000, () => {
  console.log('Servidor rodando')
})
