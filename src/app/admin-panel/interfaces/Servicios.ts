// Interface de Usuario Login
export interface UsuarioLogin {
  username: string;
  password: string;
}

// Objeto Usuario retornado desde el Back
export interface UsuarioRetornado {
  token?: string;
  p_nombre?: string;
  ap_paterno?: string;
  correo?: string;
}



export interface CategoriaBack {
  id: number;
  nombre: string;
}

export interface ServicioBack {
  id: number;
  categoria:CategoriaBack;
  nombre:string;
  estado:string;
  creado:string;
  actualizado:string;
}

export interface ServicioPost {
  categoria: number // ID de la categoría
  nombre: string
}

