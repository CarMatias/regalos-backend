import supabase from '../dbConnection'

class BeneficiaryService {
  async newBeneficiary(name: string, apellido: string,id_user:string) {
    const { data, error } = await supabase.from('beneficiario').insert([{ name: name, apellido: apellido, id_user:id_user }])
    return data != null ? 'Se agrego correctamente el benficiario!' : error
  }
  async getBeneficiaryById(id_beneficiary: number) {
    const { data: beneficiario, error } = await supabase
      .from('beneficiario')
      .select('name,apellido')
      .eq('id', id_beneficiary)
    return beneficiario
  }
  async getBeneficiarys(id_user:string) {
    console.log(id_user)
    
    const { data: beneficiario, error } = await supabase.from('beneficiario').select('name,apellido,id').eq('id_user',id_user)
    console.log(beneficiario)
    return beneficiario
  }
}
export default new BeneficiaryService()
