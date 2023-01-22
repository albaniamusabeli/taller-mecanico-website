import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Correo } from '../../models/correo';
import { EmailService } from '../../services/email.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  //EXPRESION REGULAR EMAIL
  private regexEmail = /\S+@\S+\.\S+/;


  // Spinner
  loading = false

  // Objecto correo inicializado
  correo:Correo = {
    nombre: '',
    email: '',
    telefono: 0,
    mensaje: ''
  }

  constructor( private fb: FormBuilder, private emailService: EmailService ) { }

  ngOnInit(): void {
  }

  // formulario Reactivo
  formularioContacto = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.pattern(this.regexEmail)]],
    telefono: ['', [Validators.required, Validators.minLength(5)]],
    mensaje: ['', [Validators.required, Validators.minLength(5)]],

  })

  onContacto(){
    // Spinner load
    this.loading = true;

    this.correo = {
      nombre: this.formularioContacto.value.nombre,
      email: this.formularioContacto.value.email,
      telefono: this.formularioContacto.value.telefono,
      mensaje: this.formularioContacto.value.mensaje
    }


    this.emailService.enviarCorreo(this.correo).subscribe({

      next: () =>{
        this.loading = false;
        Swal.fire(
          '¡¡Correo enviado!!',
          'Responderemos a la brevedad',
          'success'
        )
        this.formularioContacto.reset()
      },
      error: (error) =>{
        this.loading = false;
        console.log(error.error.message) // mensaje de error desde la vista de Django
        Swal.fire(
          'Lo sentimos',
          error.error.message,
          'warning'
        )
      }
    })
    
  }

}
