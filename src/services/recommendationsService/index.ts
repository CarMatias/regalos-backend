import { definitions } from '../../../types/supabase'
import buyGiftService from '../buyGiftService'
import supabase from '../dbConnection'
import { Regalo } from './types'

const getIdByTag = async (tags: string[]): Promise<any> => {
  try {
    let { data: etiqueta, error } = await supabase.from('etiqueta').select('*').in('name', tags)
    return etiqueta
  } catch (e) {
    //TODO
  }
}

const getIdGift = async (idTag: number[]): Promise<any> => {
  try {
    let { data: regaloetiqueta, error } = await supabase
      .from('regaloetiqueta')
      .select('*')
      .in('id_etiqueta', idTag)
    return regaloetiqueta
  } catch (e) {
    //TODO
  }
}

const getGifts = async (idGifts: string[]) => {
  let { data: regalo, error } = await supabase
    .from<definitions['regalo']>('regalo')
    .select('*')
    .in('id', idGifts)
  return regalo
}

const findTagsValues = (tags: any, value: any): any => {
  let tag = tags.find((v) => v.id == value.id_etiqueta)
  return tag
}

interface Result {
  id: number
  nombre: string
  puntaje: number
  image: string
}
class RecommendationsService {
  async removeAlreadyBoughtGifts(gifts: Result[], userId: number, beneficiaryId: number): Promise<Result[]> {
    const { data } = await supabase
      .from<definitions['regalobeneficiario']>('regalobeneficiario')
      .select('*')
      .eq('id_beneficiario', beneficiaryId)
      .eq('id_usuario', userId)
    const boughtGiftIds = data ?? []
    console.log(boughtGiftIds)
    const boughtGifts = boughtGiftIds.map((gift) => gift.id_regalo)
    return gifts.filter((gift) => !boughtGifts.includes(gift.id))
  }

  async getMysteriousGift(
    userId: number,
    tags: string[],
    beneficiaryId: number
  ): Promise<{
    id: number
    name: string
    imgSource: string
  }> {
    const regalos = await supabase
      .from<definitions['regalo'] & { 'etiquetas.etiqueta.name': string; beneficiarios: unknown[] }>('regalo')
      .select(
        `
          id,
          name,
          image,
          beneficiarios:regalobeneficiario(
            id_beneficiario,
            id_usuario
          ),
          etiquetas:regaloetiqueta!inner(
            etiqueta!inner(name)
          )
    `
      )
      .in('etiquetas.etiqueta.name', tags)

    const mappedData = regalos.data.filter((r) => r.beneficiarios.length == 0)
    const index = Math.floor(Math.random() * mappedData.length)
    buyGiftService.buyGift(regalos.data[index].id, userId.toString(), beneficiaryId)
    return mappedData.map(
      (e) =>
        ({
          id: e.id,
          name: e.name,
          imgSource: e.image,
        } as {
          id: number
          name: string
          imgSource: string
        })
    )[index]
  }

  async findGifts(scores: any[]): Promise<Result[]> {
    const regalos: Array<Regalo> = []
    let regaloDTO: Regalo
    let arrTag = scores.map((v) => v.nombre)
    let lstIdTags = await getIdByTag(arrTag)
    let arr = lstIdTags.map((value) => value.id)
    let lstIdGift = await getIdGift(arr)
    let arrGift = lstIdGift.map((value) => value.id_regalo)
    for (let gift of await getGifts(arrGift)) {
      let tagTemp = lstIdGift
        .filter((value) => value.id_regalo == gift.id)
        .map((value) => findTagsValues(lstIdTags, value))
      if (tagTemp != null || tagTemp != undefined) {
        let objTemp = { id: gift.id, name: gift.name, image: gift.image }
        let lstTag = []
        tagTemp.map((value) => lstTag.push({ id: value.id, name: value.name }))
        let regaloDTO = { ...objTemp, etiqueta: lstTag }
        regalos.push(regaloDTO)
      }
    }
    const result = regalos.map((regalo) => {
      let matches = []
      regalo.etiqueta.map((etiqueta) => matches.push(scores.filter((sc) => sc.nombre == etiqueta.name)))
      let puntaje = 0
      matches.map((match) => (puntaje += match[0].puntaje))
      return { id: regalo.id, nombre: regalo.name, puntaje: puntaje, image: regalo.image }
    })
    return result
  }
}

export default new RecommendationsService()
