import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  // URL de la API
  private ApiURL: string = 'https://vm-dev-back.herokuapp.com/api/clientes/'

  constructor(private http: HttpClient) { }

  // Obtener todos los clientes
  obtenerClientes(): Observable<Cliente[]> {
    const url = this.ApiURL + 'cliente/'
    return this.http.get<Cliente[]>(url)

  }

  /* Agregar clientes */
  agregarCliente(cliente: Cliente) {
    const url = this.ApiURL + 'cliente/';
    return this.http.post(url, cliente);
  }

  /* Actualizar información de un cliente */
  editarCliente(cliente: Cliente, id: string) {
    const url = this.ApiURL + 'cliente/' + id + '/'
    return this.http.put(url, cliente)
  }

  // Eliminar cliente
  eliminarCliente(id: string) {
    const url = this.ApiURL + 'cliente/' + id + '/'
    return this.http.delete(url)
  }
}
