import { Injectable } from '@angular/core';
import { UsuarioRetornado } from '../interfaces/Servicios';

@Injectable({
  providedIn: 'root'
})
export class StorageLoginService {

  //Datos del usuario
  usuario: UsuarioRetornado = {
    token: undefined,
    p_nombre: undefined,
    ap_paterno: undefined,
    correo: undefined
  }

  constructor() { }

  //Guardar datos del usuario en el Local Storage
  guardarUsuario(usuario: any) {
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuario))
  }


  //Borrar datos del usuario en el Local Storage
  borrarUsuario() {
    localStorage.removeItem("usuarioLogueado");
    this.usuario.token = undefined;
    this.usuario.p_nombre = undefined;
    this.usuario.ap_paterno = undefined;
    this.usuario.correo = undefined;
  }


  //Recuperar datos guardados del usuario
  recuperarUsuario(){
    if(JSON.parse(localStorage.getItem('usuarioLogueado')!)){
      this.usuario = JSON.parse(localStorage.getItem('usuarioLogueado')!);
    }
  }


  








}
