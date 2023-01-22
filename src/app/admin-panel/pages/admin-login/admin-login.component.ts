import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioLogin } from '../../interfaces/Servicios';
import { AuthService } from '../../services/auth.service';
import { StorageLoginService } from '../../services/storage-login.service';
import Swal from 'sweetalert2';
//import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  correoUsuario: string = '';

  
  constructor(
    private fb:FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storage: StorageLoginService
    ) { }

  ngOnInit(): void {
  }


  // Formulario Reactivo
  formularioLogin = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  })


  onLogin(){
    this.authService.login(this.formularioLogin.value.username, this.formularioLogin.value.password)
    .subscribe({
      next:(data:UsuarioLogin)=>{
        console.log(data);
        // vaciar el formulario despues de loguearse
        this.formularioLogin.reset()
        // guardar y extraer los datos de usuario logueado en el servicio Storage
        this.storage.recuperarUsuario();
        // Redireccion a home
        this.router.navigate(['/admin/home'])
      },
      error: (error) => {
        Swal.fire(
          'Advertencia',
          'El nombre y/o la contraseña son incorrectas',
          'warning'
        )
        
      }

    })

  }
}
