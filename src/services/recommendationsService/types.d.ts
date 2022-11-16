export interface Regalo{
    id:number,
    name:string,
    image:string,
    price:number | null
    etiqueta:Etiqueta[]
}

export interface Etiqueta{
    id:number,
    name:string
}