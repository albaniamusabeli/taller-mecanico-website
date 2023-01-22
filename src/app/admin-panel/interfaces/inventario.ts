export interface Insumo {
    id?: number,
    id_categoria: number,
    categoria: string | number,
    marca: string,
    descripcion: string
    unidad: number
    fecha_creado?: string
    fecha_actualizado?: string
}

export interface CategoriaInsumo {
    id: number
    nombre: string
}
