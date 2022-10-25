import bodyParser from "body-parser";
import { Router } from "express";
import uploadFavoriteService from "../services/uploadFavoriteService";
import  UploadGiftService  from '../services/uploadGiftsService'

const router = Router()
const cors  = require('cors')
const corsOprtions={
    origin:"*",
    optionsSuccesStatus:200
}
router.use(bodyParser.json())

router.post('/uploadfav',cors(corsOprtions),async(req,res)=>{
    const id_regalo = req.body.id_regalo
    const id_usuario = req.body.id_usuario
    const newFav = uploadFavoriteService.newFavorite(id_regalo, id_usuario)
    if(newFav != null){
        res.send("Se agrego el regalo a favoritos correctamente!")
    }
})

router.get('/myfav', cors(corsOprtions),async(req,res)=>{
    const id_usuario = req.body.id_usuario
    const IdGift = await uploadFavoriteService.getGiftIdByIdUser(id_usuario)
    const lstIdGift = IdGift.map((value)=> value.id_regalo)
    const gifts = await UploadGiftService.getGiftFav(lstIdGift)
    res.send(gifts)
})
export default router