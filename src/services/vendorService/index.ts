import supabase from "../dbConnection"

class VendorService{
    async newVendor(id_reg:number, id_usu:number){
      const { data, error } = await supabase
      .from('vendedor')
      .insert([
        { id_regalo: id_reg, id_usuario: id_usu},
      ])
        return data 
    }

    async getGiftsIdByIdUser(id_usuario:number){
      let { data: regalos, error } = await supabase
      .from("regalo")
      .select("name")
      .eq("id_vendedor", id_usuario)
      return regalos
    }

    async getGiftIdByIdUser(id_usuario:number){
      const { data: regalos, error } = await supabase
        .from("regalo")
        .select(
          `
          id,name,feedback(calificacion))
          `
          ).not( "id_vendedor", "is", "null" );
        return regalos
      }
    }
    

export default new VendorService
