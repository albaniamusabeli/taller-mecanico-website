import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '../models/taller';

@Injectable({
  providedIn: 'root'
})
export class BackTallerService {

  // URL de la API
  private ApiURL: string = 'https://vm-dev-back.herokuapp.com/api/taller/servicio/'


  constructor( private http: HttpClient ) { }

  // Obtener todos los servicios del taller
  obtenerServicios(): Observable<Servicio[]>{
    const url = this.ApiURL
    return this.http.get<Servicio[]>(url)
  }


}
