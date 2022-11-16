import { definitions } from '../../../types/supabase'
import supabase from '../dbConnection'

class BuyGiftService {
  async buyGift(giftId: number, userId: string, beneficiaryId: number) {
    console.log('buying gift', giftId, userId)
    const res = await supabase.from<definitions['regalobeneficiario']>('regalobeneficiario').insert([
      {
        id_regalo: giftId,
        id_beneficiario: beneficiaryId,
        id_usuario: userId,
      },
    ])
    console.log(res.error)
  }
}

export default new BuyGiftService()
