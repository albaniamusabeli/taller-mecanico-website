export interface Cliente {
    id?: string;
    run: number;
    dv_run: string;
    p_nombre: string;
    s_nombre?: string;
    ap_paterno: string;
    ap_materno: string;
    telefono: number;
    correo: string;
    estado?: boolean;
    creado?: string;
    actualizado?: string;
}
