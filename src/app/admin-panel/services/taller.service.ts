import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaBack, ServicioBack, ServicioPost } from '../interfaces/Servicios';

@Injectable({
  providedIn: 'root'
})
export class TallerService {

  // URL de la API
  private ApiURL: string = 'https://vm-dev-back.herokuapp.com/api/taller/'


  constructor(private http: HttpClient) { }

  // Obtener todos las categorías de servicio
  obtenerCategorias(): Observable<CategoriaBack[]> {
    const url = this.ApiURL
    return this.http.get<CategoriaBack[]>(url + 'categoria/')
  }

  // Obtener todos los servicios del taller
  obtenerServicios(): Observable<ServicioBack[]> {
    const url = this.ApiURL
    return this.http.get<ServicioBack[]>(url + 'servicio/')
  }

  // Agregar un servicio
  agregarServicio(servicio: ServicioPost){
    const url = this.ApiURL
    return this.http.post(url + 'servicio/',servicio)
  }

  // Editar un servicio
  editarServicio(servicio: ServicioPost, id:number){
    const url = this.ApiURL + 'servicio/' + id + '/'
    return this.http.put(url,servicio)

  }

  // Eliminar un servicio
  eliminarServicio(id:number){
    const url = this.ApiURL + 'servicio/' + id + '/'
    return this.http.delete(url)
  }

}
