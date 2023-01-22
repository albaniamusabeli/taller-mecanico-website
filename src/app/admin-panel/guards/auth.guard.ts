import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageLoginService } from '../services/storage-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private storage: StorageLoginService){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Si existen datos del usuario en el Local Storage, permite ingresar al Admin
    if (localStorage.getItem('usuarioLogueado')) {
      return true;
    }
    // redirect Login
    else{
      this.router.navigate(['login']);
      return false;
    }
  }

}
