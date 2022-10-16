import supabase from "../dbConnection"

class UploadQuestionService{
    async uploadQuestion(question:string,image:string):Promise<string>{
        if(question.startsWith("¿ ") && question.endsWith(" ?")){
        const { data, error } = await supabase
        .from('pregunta')
        .insert([
            { nombre: question, image: image },
        ])
        return data != null ? "Se ha cargado correctamente la pregunta!" : error.message
    }else{
        return "La pregunta debe esta en formato ¿ Pregunta Ejemplo ? "
    }
    }
}
export default new UploadQuestionService