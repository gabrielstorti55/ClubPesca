import express from 'express'
import authRoutes from './routes/auth.routes.js'
import businessRoutes from './routes/business.routes.js'
import addressRoutes from './routes/address.routes.js'
import businessTypeRoutes from './routes/businessType.routes.js'
import photoRoutes from './routes/photo.routes.js'
import offerRoutes from './routes/offer.routes.js'
import reviewRoutes from './routes/review.routes.js'
import fishRoutes from './routes/fish.routes.js'
import userRoutes from './routes/user.routes.js'
import { errorHandler } from './middleware/error.middleware.js'
import 'dotenv/config'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())
app.use('/uploads/photos', express.static('uploads/photos'));
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/business', businessRoutes)
app.use('/address', addressRoutes)
app.use('/businessType', businessTypeRoutes)
app.use('/photo', photoRoutes)
app.use('/offer', offerRoutes)
app.use('/review', reviewRoutes)
app.use('/fish', fishRoutes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
