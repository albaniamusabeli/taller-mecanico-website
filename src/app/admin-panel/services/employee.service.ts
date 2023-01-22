import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargo, Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // URL de la API
  private ApiURL: string = 'https://vm-dev-back.herokuapp.com/api/empleados/'


  constructor(private http: HttpClient) { }

  /* Obtener todos los cargos de los empleados */
  obtenerCargos(): Observable<Cargo[]> {
    const url = this.ApiURL + 'cargo/'
    return this.http.get<Cargo[]>(url)

  }

  /* Obtener todos los empleados */
  obtenerEmpleados(): Observable<Empleado[]> {
    const url = this.ApiURL + 'empleado/'
    return this.http.get<Empleado[]>(url)

  }

  /* Agregar un empleado */
  agregarEmpleado(empleado: Empleado) {
    const url = this.ApiURL + 'empleado/';
    return this.http.post(url, empleado);
  }

  /* Actualizar infrmación de un empleado */
  editarEmpleado(empleado: Empleado, id: number) {
    const url = this.ApiURL + 'empleado/' + id + '/'
    return this.http.put(url, empleado)
  }

  // Eliminar empleado
  eliminarEmpleado(id: number) {
    const url = this.ApiURL + 'empleado/' + id + '/'
    return this.http.delete(url)
  }


}
