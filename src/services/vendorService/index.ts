import supabase from "../dbConnection"

class UploadVendorService{
    async newVendor(id_reg:number, id_usu:number){
      const { data, error } = await supabase
      .from('vendor')
      .insert([
        { id_regalo: id_reg, id_usuario: id_usu},
      ])
        return data 
    }
}
export default new UploadVendorService