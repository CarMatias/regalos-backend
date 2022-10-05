import express from 'express'
import uploadRoutes from './routes/upload.routes'
import recommendationRoutes from './routes/recommendations.routes'

const app = express()

app.use(uploadRoutes)
app.use(recommendationRoutes)

export default app