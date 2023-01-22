export interface Categoria {
    id: number,
    nombre: string
}

export interface Servicio {
    id: number,
    categoria:Categoria,
    nombre:string,
    estado:string
}