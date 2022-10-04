import express from 'express'
import uploadRoutes from './routes/upload.routes'

const app = express()

app.use(uploadRoutes)

export default app