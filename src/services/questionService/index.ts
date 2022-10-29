import { definitions } from "../../../types/supabase"
import supabase from "../dbConnection"
import gift from '../giftsService/index'

const createQxT = async(question:number, tag:number)=>{
   const { data, error } = await supabase
  .from<definitions["preguntaetiqueta"]>('preguntaetiqueta')
  .insert([
    { id_etiqueta: tag, id_pregunta:question},
  ])
}

const tagValue = async (idQuestion:number,tag:string) =>{
    let label = await gift.findLabel(tag)
    if(label == null){
        label = await gift.uploadlabel(tag)
    }
    createQxT(idQuestion,await label)
}

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]] // BY COPAILOT
    }
  }

const getAllTags = async(idQuestion:any[])=>{
        const ids = idQuestion.map((value)=> value.id)
        let { data: preguntaetiqueta, error } = await supabase
        .from<definitions['pregunta'] & { etiquetas: { etiqueta: { name: string } }[] }>('pregunta')
        .select(
        `
            id,
            nombre,
            etiquetas:preguntaetiqueta(etiqueta(name))
        `
        ).in("id",ids)
      const question = preguntaetiqueta.map((p) => ({
        id:p.id,
        name: p.nombre,
        etiquetas: p.etiquetas.map((e) => e.etiqueta.name),
      }))
      shuffleArray(question)
      return question
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

    async getRandomQuestion(){
        const lstRandomQ = []
        let { data: pregunta, error } = await supabase
            .from<definitions["pregunta"]>('pregunta')
            .select("*")
        let randomPreguntas = []
        while(randomPreguntas.length < 8){
            let randomNumber = Math.trunc(Math.random()*pregunta.length)
          if(!randomPreguntas.includes(randomNumber)){
                randomPreguntas.push(randomNumber)
            }
        }

        for(const randomPregunta of randomPreguntas){
            console.log(randomPregunta)
            lstRandomQ.push(pregunta[randomPregunta])
        }
        const lstIdTags = getAllTags(lstRandomQ)
        return lstIdTags
    }


    async newFeedBack(idu:number, idr:number,cali:string){
        const { data, error } = await supabase
        .from('feedback')
        .insert([
          { id_usuario: idr, id_regalo: idu, calificacion:cali },
        ])
        return data
    }
}
export default new UploadQuestionService