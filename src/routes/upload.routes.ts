import { Router, Request } from 'express'
import  UploadGiftService  from '../services/uploadGiftsService'
import uploadQuestionService from '../services/uploadQuestionService'

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
    const tag = req.body.tag
    if(name != null && image != null && tag != null){
      const newGift = await UploadGiftService.uploadGift(name,image,tag)
      res.send(newGift)
    }else{
      res.send("Debe enviar un name, image y tag como parametros")
    }
  })

  router.get('/uploadquestion',cors(corsOptions),async (req, res)=>{
    const question = req.body.question
    const image = req.body.image
    if(question != null && image != null ){
      const newQuestion = await uploadQuestionService.uploadQuestion(question,image)
      res.send(newQuestion)
    }else{
      res.send("Debe enviar una question a image como parametros")
    }
  })
  export default router
