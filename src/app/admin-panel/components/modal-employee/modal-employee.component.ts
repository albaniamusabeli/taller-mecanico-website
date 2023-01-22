import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Cargo } from '../../interfaces/empleado';
import { EmployeeService } from '../../services/employee.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-employee',
  templateUrl: './modal-employee.component.html',
  styleUrls: ['./modal-employee.component.scss']
})
export class ModalEmployeeComponent implements OnInit {

  // Título Modal
  tituloModal: string = 'Registrar un nuevo empleado'
  // Boton Agregar- Editar
  textoBoton: string = 'Agregar'

  //EXPRESION REGULAR EMAIL
  private regexEmail = /\S+@\S+\.\S+/;

  // Inicializar array cargos del empleado
  listaCargos: Cargo[] = []


  constructor(
    private empleadoServicie: EmployeeService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalEmployeeComponent>, // Referencia de este componente Modal
    @Inject(MAT_DIALOG_DATA) public datoEmpleado: any, // datoServicio --> objeto element de la tabla

  ) { }

  ngOnInit(): void {
    this.obtenerCargos()

    // Evaluar si esta presente el objeto datoEmpleado al abrir modal para editar empleado
    if (this.datoEmpleado) {

      // Título Modal
      this.tituloModal = 'Editar información del empleado'
      // Boton Agregar- Editar
      this.textoBoton = 'Editar'

      // Completar datos del formulario para editar
      this.formularioEmpleado.controls['run'].setValue(this.datoEmpleado.run)
      this.formularioEmpleado.controls['dv_run'].setValue(this.datoEmpleado.dv_run)
      this.formularioEmpleado.controls['p_nombre'].setValue(this.datoEmpleado.p_nombre)
      this.formularioEmpleado.controls['s_nombre'].setValue(this.datoEmpleado.s_nombre)
      this.formularioEmpleado.controls['ap_paterno'].setValue(this.datoEmpleado.ap_paterno)
      this.formularioEmpleado.controls['ap_materno'].setValue(this.datoEmpleado.ap_materno)
      this.formularioEmpleado.controls['correo'].setValue(this.datoEmpleado.correo)
      this.formularioEmpleado.controls['telefono'].setValue(this.datoEmpleado.telefono)
      this.formularioEmpleado.controls['cargo'].setValue(this.datoEmpleado.cargo.id)

    }
  }

  // Formulario Reactivo
  formularioEmpleado = this.fb.group({

    run: ['', [Validators.required, Validators.min(1111111), Validators.max(99999999)]],
    dv_run: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
    p_nombre: ['', [Validators.required, Validators.minLength(3)]],
    s_nombre: ['', [Validators.minLength(3)]],
    ap_paterno: ['', [Validators.required, Validators.minLength(3)]],
    ap_materno: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.minLength(5), Validators.pattern(this.regexEmail)]],
    telefono: ['', [Validators.required, Validators.min(111111111), Validators.max(999999999)]],
    cargo: ['', [Validators.required]],

  });

  // Obtener los cargos de los empleados
  obtenerCargos() {
    this.empleadoServicie.obtenerCargos().subscribe({
      next: (data: Cargo[]) => {
        //console.log(data);
        // Rellenar array desde el backend a listaCargos
        this.listaCargos = data;

      }
    })
  }

  agregarEditarEmpleado() {
    //console.log(this.formAgregarServicio.value);
    if (!this.datoEmpleado) {
      this.agregarEmpleado();

    }
    else {
      // Editar empleado
      this.editarEmpleado();
    }
  }

  agregarEmpleado() {
    this.empleadoServicie.agregarEmpleado(this.formularioEmpleado.value).subscribe({
      next: (data: any) => {
        this.formularioEmpleado.reset();
        this.dialogRef.close('agregado');
      },
      error: (error) => {
        if (error.error.correo) {
          Swal.fire({
            icon: 'error',
            title: error.error.correo,
            showConfirmButton: false,
            timer: 1500
          });
        }
        if (error.error.run) {
          Swal.fire({
            icon: 'error',
            title: error.error.run,
            showConfirmButton: false,
            timer: 1500
          });
        }

        console.log(error);


        //console.log(error);
      }
    });
  }

  editarEmpleado() {
    // run -> pk del empleado
    this.empleadoServicie.editarEmpleado(this.formularioEmpleado.value, this.datoEmpleado.id)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'info',
            title: 'Datos del empleado actualizados',
            showConfirmButton: false,
            timer: 1650
          });
          this.dialogRef.close('actualizado');
        },
        error: (error) => {
          console.log(error);

        }
      });
  }


  /* MODAL */
  cerrarModal() {
    this.dialogRef.close('cerrado'); // Valor "cerrado al cerrar el modal"
  }

}
