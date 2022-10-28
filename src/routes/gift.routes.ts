import { Router, Request } from 'express'
import buyGiftService from '../services/buyGiftService'
import UploadGiftService from '../services/giftsService'
import  GiftService  from '../services/giftsService'

const router = Router()
var bodyParser = require('body-parser')
var cors = require('cors')
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/uploadgift', cors(corsOptions), async (req, res) => {
  const name = req.body.name
  const image = req.body.image
  const tag = req.body.tag
  if (name != null && image != null && tag != null) {
    const newGift = await UploadGiftService.uploadGift(name, image, tag)
    res.send(newGift)
  } else {
    res.send('Debe enviar un name, image y tag como parametros')
  }
})

router.post('/buyGift', cors(corsOptions), async (req, res) => {
  const { giftId, userId } = req.body

  if (giftId != null && userId != null) {
    await buyGiftService.buyGift(giftId, userId)
    res.status(200).send('Gift bought')
  } else {
    res.status(400).send('Debe enviar un giftId y userId como parametros')
  }
})

router.get('/getrandomgift', cors(corsOptions),async(req,res)=>{
    const lstGift = await GiftService.getRandomGift()
    res.send(lstGift)
 })

export default router
