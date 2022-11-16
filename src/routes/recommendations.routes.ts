import { Router, Request } from 'express'
import recommendationsService from '../services/recommendationsService'
import RecommendationsService from '../services/recommendationsService'

const router = Router()
var bodyParser = require('body-parser')
var cors = require('cors')
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

type FindRecommendationsBodyParams = {
  score: {
    nombre: string
    puntaje: number
  }[]
  userId: number
  beneficiaryId: number
}

router.post<{}, {}, FindRecommendationsBodyParams>('/findrecom', cors(corsOptions), async (req, res) => {
  const { score, userId, beneficiaryId } = req.body
  if (!score) {
    res.status(400).send('Debe enviar un score como parametro')
    return
  }
  const recommendations = await RecommendationsService.removeAlreadyBoughtGifts(
    await RecommendationsService.findGifts(score),
    userId,
    beneficiaryId
  )
  res.send(recommendations)
})
export default router

router.post<{}, {}, { userId; tags: string[]; beneficiaryId: number }>(
  '/mysteriousBox',
  cors(corsOptions),
  async (req, res) => {
    const { tags, userId, beneficiaryId } = req.body
    if (!tags) {
      res.status(400).send('Debe enviar tags como parametro')
      return
    }
    const gift = await recommendationsService.getMysteriousGift(userId, tags, beneficiaryId)

    res.send(gift)
  }
)
