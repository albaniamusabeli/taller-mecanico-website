import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.scss']
})
export class ModalClientComponent implements OnInit {

  // Título Modal
  tituloModal: string = 'Registrar un nuevo cliente'
  // Boton Agregar- Editar
  textoBoton: string = 'Agregar'


  //EXPRESION REGULAR EMAIL
  private regexEmail = /\S+@\S+\.\S+/;


  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<ModalClientComponent>, // Referencia de este componente Modal
    @Inject(MAT_DIALOG_DATA) public datoCliente: any, // datoServicio --> objeto element de la tabla


  ) { }

  // Formulario reactivo cliente
  formularioCliente = this.fb.group({

    run: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
    dv_run: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
    p_nombre: ['', [Validators.required, Validators.minLength(3)]],
    s_nombre: ['', [Validators.minLength(3), Validators.maxLength(50)]],
    ap_paterno: ['', [Validators.required, Validators.minLength(3)]],
    ap_materno: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.minLength(5), Validators.pattern(this.regexEmail)]],
    telefono: ['', [Validators.required, Validators.min(111111111), Validators.max(999999999)]],

  })

  ngOnInit(): void {

    // Evaluar si esta presente el objeto datoEmpleado al abrir modal para editar cliente
    if (this.datoCliente) {

      // Título Modal
      this.tituloModal = 'Editar información del cliente'
      // Boton Agregar- Editar
      this.textoBoton = 'Editar'

      this.formularioCliente.controls['run'].setValue(this.datoCliente.run)
      this.formularioCliente.controls['dv_run'].setValue(this.datoCliente.dv_run)
      this.formularioCliente.controls['p_nombre'].setValue(this.datoCliente.p_nombre)
      this.formularioCliente.controls['s_nombre'].setValue(this.datoCliente.s_nombre)
      this.formularioCliente.controls['ap_paterno'].setValue(this.datoCliente.ap_paterno)
      this.formularioCliente.controls['ap_materno'].setValue(this.datoCliente.ap_materno)
      this.formularioCliente.controls['correo'].setValue(this.datoCliente.correo)
      this.formularioCliente.controls['telefono'].setValue(this.datoCliente.telefono)
    }

  }

  agregarEditarCliente() {
    // Si no hay datos del cliente para editar
    if (!this.datoCliente) {
      this.agregarCliente()
    }
    else {
      this.editarCliente()
    }
  }

  agregarCliente() {
    console.log(this.formularioCliente.value);
    this.clientService.agregarCliente(this.formularioCliente.value).subscribe({
      next: (data: any) => {
        this.formularioCliente.reset();
        this.dialogRef.close('agregado');
      },
      error: (error) => {
        //console.log(error.error.run[0]);
        Swal.fire({
          icon: 'warning',
          title: error.error.run[0],
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

  }

  editarCliente() {
    this.clientService.editarCliente(this.formularioCliente.value, this.datoCliente.id)
      .subscribe({
        next: (data: any) => {
          Swal.fire({
            icon: 'info',
            title: 'Datos del empleado actualizados',
            showConfirmButton: false,
            timer: 1660
          })
          this.dialogRef.close('actualizado')
        },
        error: (error) => {
          console.log(error);

        }
      })
  }


  /* MODAL */
  cerrarModal() {
    this.dialogRef.close('cerrado'); // Valor "cerrado al cerrar el modal"
  }
}


