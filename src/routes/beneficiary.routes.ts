import bodyParser from "body-parser";
import { Router } from "express";
import beneficiaryService from '../services/beneficiaryService'

const router = Router()
const cors = require('cors')

const corsOptions = {
        origin: "*",
        optionsSuccessStatus: 200
      }
router.use(bodyParser.json())

router.post('/newbeneficiary',cors(corsOptions), async (req,res)=>{
    const name = req.body.nombre
    const secondName = req.body.apellido
    const newBeneficary = await beneficiaryService.newBeneficiary(name, secondName)
    res.send(newBeneficary)
})

export default router