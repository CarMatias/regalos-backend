import supabase from "../dbConnection"

class UploadFeedbackService{
    async newFeedback(id_reg:number, id_usu:number, calif:string){
      const { data, error } = await supabase
      .from('feedback')
      .insert([
        { id_regalo: id_reg, id_usuario: id_usu, calificacion: calif },
      ])
        return data 
    }
}
export default new UploadFeedbackService