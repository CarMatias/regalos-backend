import { Router, Request } from 'express'
import  UploadGiftService  from '../services/uploadGiftsService'

const router = Router()
var bodyParser = require('body-parser')
var cors = require('cors')
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true }))

router.post('/uploadgift',cors(corsOptions),async (req, res)=>{
    const name = req.body.name
    const image = req.body.image
    const newGift = await UploadGiftService.uploadGift(name,image)
    res.send(newGift)
  })
  export default router
