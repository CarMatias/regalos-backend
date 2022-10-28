import express from 'express'
import giftRoutes from './routes/gift.routes'
import recommendationRoutes from './routes/recommendations.routes'
import questionRoutes from './routes/question.routes'
import favRoutes from './routes/fav.routes'
import beneficiaryRoutes from './routes/beneficiary.routes'
import feedbackRoutes from './routes/feedback.routes'
const app = express()


app.use(beneficiaryRoutes)
app.use(favRoutes)
app.use(giftRoutes)
app.use(recommendationRoutes)
app.use(questionRoutes)
app.use(feedbackRoutes)

export default app