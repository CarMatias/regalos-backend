import supabase from "../dbConnection"
import gift from '../giftsService/index'

const createQxT = async(question:number, tag:number)=>{
   const { data, error } = await supabase
  .from('preguntaetiqueta')
  .insert([
    { id_etiqueta: tag, id_pregunta:question},
  ])
}

const tagValue = async (idQuestion:number,tag:string) =>{
    let label = await gift.findLabel(tag)
    if(label == null){
        let label = await gift.uploadlabel(tag)
    }
    createQxT(idQuestion,await label)
}

class UploadQuestionService{
    async uploadQuestion(question:string,image:string,lstEtiquetas:string[]):Promise<string>{
        if(question.startsWith("¿ ") && question.endsWith(" ?")){
        const { data, error } = await supabase
        .from('pregunta')
        .insert([
            { nombre: question, image: image },
        ])
        if(data != null){
            lstEtiquetas.map(async(value)=> await tagValue(data[0].id,value))
            return "Se ha cargado correctamente la pregunta!"
        }else{
         error.message
        }
    }else{
        return "La pregunta debe esta en formato: ¿ Pregunta Ejemplo ?"
    }
    }
}
export default new UploadQuestionService