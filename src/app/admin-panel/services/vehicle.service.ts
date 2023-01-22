import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca, Modelo, Vehiculo, VehiculoPOST } from '../interfaces/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  // URL de la API
  private ApiURL: string = 'https://vm-dev-back.herokuapp.com/api/vehiculos/'


  constructor(private http: HttpClient) { }

  // Obtener todos las categorías de servicio
  obtenerMarcas(): Observable<Marca[]> {
    const url = this.ApiURL
    return this.http.get<Marca[]>(url + 'marca/')

  }

  // Obtener todos las categorías de servicio
  obtenerModelos(): Observable<Modelo[]> {
    const url = this.ApiURL
    return this.http.get<Modelo[]>(url + 'modelo/')

  }

  // Obtener todos las categorías de servicio
  obtenerVehiculo(): Observable<Vehiculo[]> {
    const url = this.ApiURL
    return this.http.get<Vehiculo[]>(url + 'vehiculo/')

  }

  /* Agregar vehiculos */
  agregarVehiculo(vehiculo: VehiculoPOST) {
    const url = this.ApiURL + 'vehiculo/';
    return this.http.post(url, vehiculo);
  }

  /* Actualizar información de un vehiculo */
  editarVehiculo(vehiculo: VehiculoPOST, id: number) {
    const url = this.ApiURL + 'vehiculo/' + id + '/'
    return this.http.put(url, vehiculo)
  }

  /* Eliminar vehiculo */
  eliminarVehiculo(id: string) {
    const url = this.ApiURL + 'vehiculo/' + id + '/'
    return this.http.delete(url)
  }


}
