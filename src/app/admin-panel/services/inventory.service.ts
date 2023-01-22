import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaInsumo, Insumo } from '../interfaces/inventario';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  // URL de la API
  private ApiURL: string = 'https://vm-dev-back.herokuapp.com/api/inventario/'

  constructor(private http: HttpClient) { }

  // Obtener todas las categorias de insumos
  obtenerCategoriasInsumos(): Observable<CategoriaInsumo[]> {
    const url = this.ApiURL + 'categoria/'
    return this.http.get<CategoriaInsumo[]>(url)
  }

  // Obtener todos los insumos
  obtenerInsumos(): Observable<Insumo[]> {
    const url = this.ApiURL + 'insumo/'
    return this.http.get<Insumo[]>(url)
  }

  // Agregar insumo
  agregarInsumo(insumo: Insumo) {
    const url = this.ApiURL + 'insumo/'
    return this.http.post(url, insumo)

  }

  // Editar insumo
  editarInsumo(insumo: Insumo, id: number) {
    const url = this.ApiURL + 'insumo/' + id + '/'
    return this.http.put(url, insumo)
  }

  // Eliminar insumo
  eliminarInsumo(id: number) {
    const url = this.ApiURL + 'insumo/' + id + '/'
    return this.http.delete(url)
  }

}
