import supabase from "../dbConnection";

class BeneficiaryService {
  async newBeneficiary(name: string, apellido: string) {
    const { data, error } = await supabase
      .from("beneficiario")
      .insert([{ name: name, apellido: apellido }]);
    return data != null ? "Se agrego correctamente el benficiario!" : error;
  }
  async getBeneficiaryById(id_beneficiary: number) {
    const { data: beneficiario, error } = await supabase
      .from("beneficiario")
      .select("name,apellido")
      .eq("id", id_beneficiary);
    return beneficiario;
  }
}
export default new BeneficiaryService();
