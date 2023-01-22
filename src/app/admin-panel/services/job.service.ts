import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trabajo } from '../interfaces/trabajo';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private ApiURL: string = 'https://vm-dev-back.herokuapp.com/api/taller/'

  constructor(private http: HttpClient) { }

  // Obtener todos los trabajos registrados
  obtenerTrabajos(): Observable<Trabajo[]> {
    const url = this.ApiURL + 'trabajo/'
    return this.http.get<Trabajo[]>(url)
  }

  /* Agregar un trabajo */
  agregarTrabajo(trabajo: Trabajo) {
    const url = this.ApiURL + 'trabajo/';
    return this.http.post(url, trabajo)
  }

  /* Actualizar información de un trabajo */
  editarTrabajo(trabajo: Trabajo, id: number) {
    const url = this.ApiURL + 'trabajo/' + id + '/'
    return this.http.put(url, trabajo)
  }

    // Wliminar un trabajo
    eliminarTrabajo(id: number) {
      const url = this.ApiURL + 'trabajo/' + id + '/'
      return this.http.delete(url)
    }
}
