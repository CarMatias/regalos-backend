import supabase from '../dbConnection'

const path = require('path');
let relativePath = './app.js';
let absolutePath = path.resolve(relativePath);


class UploadGiftService{
    async uploadGift(name: string, image: string){
        
        try{
            const { data, error } = await supabase
            .from('regalo')
            .insert([
                { name: name, image: image },
            ])
            if(error) throw error
            return 'Regalo Cargado correctamente' + data 
        }catch(e){
            //TODO:
        }
    }
}
export default new UploadGiftService()