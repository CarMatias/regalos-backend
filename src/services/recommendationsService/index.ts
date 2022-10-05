import supabase from "../dbConnection";
import {Regalo} from './types'

const getIdByTag = async(tags:string[]):Promise<any> =>{
     try{
        let { data: etiqueta, error } = await supabase
        .from('etiqueta')
        .select("*")
        .in('name', tags)
        return etiqueta
    }catch(e){
        //TODO
    }
}

const getIdGift = async (idTag:number[]):Promise<any> =>{
    try{
        let { data: regaloetiqueta, error } = await supabase
        .from('regaloetiqueta')
        .select("*")
        .in('id_etiqueta', idTag)
        return regaloetiqueta
    }catch(e){
        //TODO
    }
    
}

const getGifts = async (idGifts:string[]) => {
    let { data: regalo, error } = await supabase
    .from('regalo')
    .select("*")
    .in('id', idGifts)
    return regalo
}

const findTagsValues = (tags:any,value:any): any=>{
    let tag = tags.find(v => v.id == value.id_etiqueta)
    return tag
}
class RecommendationsService{
    async findGifts(scores:any[]):Promise<any>{
        const regalos: Array<Regalo> = []
        let regaloDTO: Regalo
        let arrTag = scores.map(v => v.nombre)
        let lstIdTags = await getIdByTag(arrTag)
        let arr = lstIdTags.map(value => value.id)
        let lstIdGift = await getIdGift(arr)
        let arrGift = lstIdGift.map(value => value.id_regalo)
        for(let gift of await getGifts(arrGift)){
            let tagTemp = lstIdGift.filter(value=> value.id_regalo == gift.id ).map(value=> findTagsValues(lstIdTags,value))
            if(tagTemp != null || tagTemp != undefined){
                let objTemp = {id:gift.id,name:gift.name}
                let lstTag = []
                tagTemp.map(value => lstTag.push({id:value.id,name:value.name}))
                let regaloDTO = {...objTemp,etiqueta:lstTag}
                regalos.push(regaloDTO)
            }
        }
        const result=regalos.map((regalo)=>{
        let matches = []
        regalo.etiqueta.map(etiqueta => matches.push(scores.filter(sc => sc.nombre == etiqueta.name)))
        let puntaje = 0
        matches.map(match => puntaje += match[0].puntaje)
        return {nombre: regalo.name, puntaje: puntaje}
        })
        return result
    }
}

export default new RecommendationsService();