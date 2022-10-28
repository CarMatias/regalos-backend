import { definitions } from '../../../types/supabase'
import supabase from '../dbConnection'

class BuyGiftService {
  async buyGift(giftId: number, userId: number) {
    await supabase.from<definitions['regalobeneficiario']>('regalobeneficiario').insert([
      {
        id_regalo: giftId,
        id_beneficiario: userId,
        id_usuario: userId.toString(),
      },
    ])
  }
}

export default new BuyGiftService()