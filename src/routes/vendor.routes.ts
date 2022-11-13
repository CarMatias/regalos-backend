import bodyParser from "body-parser";
import { Router } from 'express'
import  VendorService  from '../services/vendorService'


const router = Router()
const cors  = require('cors')
const corsOptions={
    origin: "*",
    optionsSuccesStatus: 200
}
router.use(bodyParser.json())

router.post('/uploadvendor',cors(corsOptions),async(req,res)=>{
    const id_regalo = req.body.id_regalo
    const id_usuario = req.body.id_usuario
    const newVendor = VendorService.newVendor(id_regalo, id_usuario)
    if(newVendor != null){
        res.send("Enviado correctamente")
    }
})

router.get('/getvendor',cors(corsOptions),async(req,res)=>{
    const id_usuario = req.body.id_usuario
    const result = await VendorService.getFeedbackIdByIdUser(1)
    console.log(result)
    res.send(result)
})

export default router



