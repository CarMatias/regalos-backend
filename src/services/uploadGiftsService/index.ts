import supabase from '../dbConnection'

const path = require('path');
let relativePath = './app.js';
let absolutePath = path.resolve(relativePath);

async function uploadlabel(label:string):Promise<any>{
    try{
        const { data, error } = await supabase
        .from('etiqueta')
        .insert([
        { name: label }
    ])
    return await data[0].id
    }
    catch(e){
            //TODO
    }
}

async function uploadGifts(name:string,image:string):Promise<any> {
    try{
        const { data, error } = await supabase
        .from('regalo')
        .insert([
            { name: name, image: image },
        ])
        if(error) throw error
        return await data[0].id
    }catch(e){
        //TODO
    }
}
async function uploadGxL(id_gift,id_label) {
    try{
        const { data, error } = await supabase
        .from('regaloetiqueta')
        .insert([
          { id_regalo: id_gift, id_etiqueta: id_label },
        ])
    }catch(e){
        //TODO
    }
}

async function findLabel(label:string):Promise<any> {
    let { data:id, error } = await supabase
    .from('etiqueta')
    .select('id')
    .eq('name', label)
     return  id[0]
}

class UploadGiftService{
    async uploadGift(name: string, image: string,labels:string[]){
        let id_gift = await uploadGifts(name,image)
        for(let label of labels){
            let id_label = await findLabel(label.toLowerCase())
            if(id_label === null || id_label === undefined){
                id_label = await uploadlabel(label.toLowerCase())
                uploadGxL(id_gift,id_label)
            }else{
                uploadGxL(id_gift,id_label.id)
            }
        }
        return "Regalo cargado Correctamente!"
    }

    async getGiftFav(lstGift:number[]){
        let { data: regalo, error } = await supabase
        .from('regalo')
        .select("*")
        .in('id', lstGift)
        return regalo
    }
}
export default new UploadGiftService()