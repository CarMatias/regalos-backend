import supabase from '../dbConnection'

const path = require('path')
let relativePath = './app.js'
let absolutePath = path.resolve(relativePath)

async function uploadlabel(label: string): Promise<any> {
  label = label.toLowerCase()
  try {
    const { data, error } = await supabase.from('etiqueta').insert([{ name: label }])
    return await data[0].id
  } catch (e) {
    //TODO
  }
}

async function uploadGifts(name: string, image: string): Promise<any> {
  try {
    const { data, error } = await supabase.from('regalo').insert([{ name: name, image: image }])
    if (error) throw error
    return await data[0].id
  } catch (e) {
    //TODO
  }
}
async function uploadGxL(id_gift, id_label) {
  try {
    const { data, error } = await supabase
      .from('regaloetiqueta')
      .insert([{ id_regalo: id_gift, id_etiqueta: id_label }])
  } catch (e) {
    //TODO
  }
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

class UploadGiftService {
  async uploadGift(name: string, image: string, labels: string[]) {
    let id_gift = await uploadGifts(name, image)
    for (let label of labels) {
      let id_label = await this.findLabel(label)
      if (id_label === null || id_label === undefined) {
        id_label = await uploadlabel(label)
        uploadGxL(id_gift, id_label)
      } else {
        uploadGxL(id_gift, id_label)
      }
    }
    return 'Regalo cargado Correctamente!'
  }

  async getGiftFav(lstGift: number[]) {
    let { data: regalo, error } = await supabase.from('regalo').select('*').in('id', lstGift)
    return regalo
  }

  async uploadlabel(label: string): Promise<number> {
    label = label.toLowerCase()
    try {
      const { data, error } = await supabase.from('etiqueta').insert([{ name: label }])
      return await data[0].id
    } catch (e) {
      //TODO
    }
  }

  async findLabel(label: string): Promise<number | null> {
    let { data: id, error } = await supabase.from('etiqueta').select('id').eq('name', label)
    return id != null && id.length != 0 ? (id[0].id as number) : null
  }

  async getRandomGift() {
    let { data: regalos, error } = await supabase.from('regalo').select('*')
    shuffleArray(regalos)
    const lstRandom = []
    for (let i = 0; i < 7; i++) {
      lstRandom.push(regalos[i])
    }
    return lstRandom
  }

  async getBoughtGiftsTags(): Promise<{ idetiqueta: number; etiqueta: string; count: number }[]> {
    const res = await supabase.from('bought_gifts_tags').select('*').order('count', { ascending: false })
    return res.data
  }
}
export default new UploadGiftService()
