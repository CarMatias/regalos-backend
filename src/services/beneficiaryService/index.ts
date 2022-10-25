import supabase from "../dbConnection"

class BeneficiaryService{
    async newBeneficiary(name: string, secondName: string){
    const { data, error } = await supabase
    .from('beneficiario')
    .insert([   
        { 'name': name, 'apellido': secondName },
    ])
    return data != null ?   "Se agrego correctamente el benficiario!" :   error 
    }
}

export default new BeneficiaryService()