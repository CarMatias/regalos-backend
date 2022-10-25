import supabase from "../dbConnection"

class UploadFavoriteService{
    async newFavorite(id_regalo:number,id_usuario:number){
        const { data, error } = await supabase
        .from('favorito')
        .insert([
          { id_regalo: id_regalo, id_usuario: id_usuario},
        ])
    }

    async getGiftIdByIdUser(id_usuario:number){
      let { data: favorito, error } = await supabase
      .from('favorito')
      .select("id_regalo")
      .eq("id_usuario", id_usuario)
      return favorito
    }
}
export default new UploadFavoriteService