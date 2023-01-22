import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { StorageLoginService } from './storage-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api_url = 'https://vm-dev-back.herokuapp.com/api/cuenta/login/';  

  constructor(private http: HttpClient, private storage: StorageLoginService, private router: Router,) { }

  login(username:string, password:string){
    return this.http.post<any>(this.api_url, {username, password}).pipe(
      map(user =>{

        if(user && user.token){
          //localStorage.setItem("usuarioLogueado", JSON.stringify(user))
          this.storage.guardarUsuario(user);
          
        }
        return user;
      })
    )
  }


   // Funcion logout para borrar del localStorage los datos del usuario Logueado
   logout(){
    //localStorage.removeItem('usuarioLogueado');
    this.storage.borrarUsuario();
    this.router.navigate(['/admin/login/'])
    
  }






}
