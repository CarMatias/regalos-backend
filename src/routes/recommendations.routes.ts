import { Router, Request } from 'express'
import RecommendationsService from '../services/recommendationsService'

const router = Router()
var bodyParser = require('body-parser')
var cors = require('cors')
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true }))

router.get('/findrecom',cors(corsOptions),async (req, res)=>{
    const score = req.body.score
    const recommendations = await RecommendationsService.findGifts(score)
    res.send(recommendations)
  })
  export default router