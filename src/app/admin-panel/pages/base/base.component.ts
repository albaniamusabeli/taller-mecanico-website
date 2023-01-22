import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { navbarData } from './navData';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})

export class BaseComponent implements OnInit {
  currentRoute: any;
  public opened = true;
  navData = navbarData;
  time = new Date();
  intervalId: any;

  constructor(public datePipe: DatePipe,
              private auth: AuthService) {
  }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  cerrarSesion() {
    // Confirmación
    Swal.fire({
      title: '¿Desea cerrar sesión?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',

    }).then((result) => {
      if (result.isConfirmed) {
        // Cerrar sesión
        this.auth.logout()
      }
    })
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
