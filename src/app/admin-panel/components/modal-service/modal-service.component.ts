import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaBack } from '../../interfaces/Servicios';
import { TallerService } from '../../services/taller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-service',
  templateUrl: './modal-service.component.html',
  styleUrls: ['./modal-service.component.scss']
})
export class ModalServiceComponent implements OnInit {

  // Inicializar array de categorías
  categorias: CategoriaBack[] = [];

  // Título Modal
  tituloModal: string = 'Agregar servicio'
  // Boton Agregar- Editar
  boton: string = 'Agregar'

  constructor(
    private tallerService: TallerService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalServiceComponent>, // Referencia de este componente Modal
    @Inject(MAT_DIALOG_DATA) public datosServicio: any, //
  ) { }

  // Formulario Reactivo
  formAgregarServicio = this.fb.group({
    categoria: ['', [Validators.required, Validators.minLength(5)]],
    nombre: ['', [Validators.required, Validators.minLength(5)]],

  })

  ngOnInit(): void {

    // Llamar a metodo para obtener todas las categorías
    this.obtenerCategorias();

    console.log(this.datosServicio); // datosServicio: datos seleccionados para editar
    if (this.datosServicio) {

      // Boton y título editar
      this.tituloModal = 'Editar servicio'
      this.boton = "Editar"

      // Completar valores para editar
      this.formAgregarServicio.controls['categoria'].setValue(this.datosServicio.categoria.id)
      this.formAgregarServicio.controls['nombre'].setValue(this.datosServicio.nombre)
    }

  }

  obtenerCategorias() {
    this.tallerService.obtenerCategorias().subscribe({
      next: (data: CategoriaBack[]) => {
        //console.log(data);
        this.categorias = data;

      },
      error: (error) => {
        // En caso de error dejar vacío el array
        this.categorias = [];
      }
    })
  }

  /* Boton Agregar-Editar Servicio */
  agregarEditarServicio() {
    // Si no existe la variable datosServicio(datos de un servicio para editarlo) -> usar método POST
    if (!this.datosServicio) {
      //console.log(this.formAgregarServicio.value);
      // LLamar al servicio post -> Parametro body = formulario.value
      this.tallerService.agregarServicio(this.formAgregarServicio.value).subscribe({
        next: (data: any) => {
          //console.log(data);
          this.formAgregarServicio.reset()
          this.dialogRef.close('agregado') // // valor del dialogRef al cerrar el modal
        },
        error: (error) => {
          this.dialogRef.close()
          Swal.fire({
            icon: 'error',
            title: 'El servicio ya existe',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }
    else {
      // Llamar método para actualizar servicio (PUT)
      this.editarServicioPUT()
    }
  }

  // Editar un servicio
  editarServicioPUT() {
    this.tallerService.editarServicio(this.formAgregarServicio.value, this.datosServicio.id)
      .subscribe({
        next: (data) => {

          // Mensaje confirmando la adición de un nuevo servicio
          Swal.fire({
            icon: 'success',
            title: 'Servicio actualizado',
            showConfirmButton: false,
            timer: 1500
          })

          this.formAgregarServicio.reset()
          this.dialogRef.close('actualizado') // valor del dialogRef al cerrar el modal
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
