import bodyParser from "body-parser";
import { Router } from 'express'
import  uploadFeedbackService  from '../services/uploadFeedbackService'


const router = Router()
const cors  = require('cors')
const corsOptions={
    origin: "*",
    optionsSuccesStatus: 200
}
router.use(bodyParser.json())

router.post('/uploadfeedback',cors(corsOptions),async(req,res)=>{
    const id_regalo = req.body.id_regalo
    const id_usuario = req.body.id_usuario
    const calificacion = req.body.calificacion
    const newFeedback = uploadFeedbackService.newFeedback(id_regalo, id_usuario, calificacion)
    if(newFeedback != null){
        res.send("Feedback enviado correctamente")
    }
})

export default router



