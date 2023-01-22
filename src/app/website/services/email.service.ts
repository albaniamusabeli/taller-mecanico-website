import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Correo } from '../models/correo';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

    // URL de la API
    private ApiURL: string = 'https://vm-dev-back.herokuapp.com/api/email/'

  constructor( private http: HttpClient ) { }

  // Envio de correo
  enviarCorreo( correo: Correo ):Observable<any>{
    const url = this.ApiURL
    return this.http.post(url,correo)
 
  }


}
