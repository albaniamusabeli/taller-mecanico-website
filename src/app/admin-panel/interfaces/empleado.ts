export interface Empleado {
    id: number;
    run: string;
    dv_run: string;
    p_nombre: string;
    s_nombre?: string;
    ap_paterno: string;
    ap_materno: string;
    correo: string;
    telefono: number;
    estado:string;
    creado: string;
    actualizado: string;
    cargo: Cargo | number;

}

export interface Cargo {
    id: number;
    nombre: string
}
