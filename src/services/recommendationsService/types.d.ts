export interface Regalo{
    id:number,
    name:string,
    image:string,
    etiqueta:Etiqueta[]
}

export interface Etiqueta{
    id:number,
    name:string
}