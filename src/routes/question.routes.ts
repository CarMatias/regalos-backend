import { Router, Request } from 'express'
import uploadQuestionService from '../services/uploadQuestionService'

const router = Router()
var bodyParser = require('body-parser')
var cors = require('cors')
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 201 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true }))

router.post('/uploadquestion',cors(corsOptions),async (req, res)=>{
    const question = req.body.question
    const image = req.body.image
    const lstEtiquetas = req.body.tags
    if(question != null && image != null ){
      const newQuestion = await uploadQuestionService.uploadQuestion(question,image,lstEtiquetas)
      res.send(newQuestion)
    }else{
      res.send("Debe enviar una question a image como parametros")
    }
  })
  export default router