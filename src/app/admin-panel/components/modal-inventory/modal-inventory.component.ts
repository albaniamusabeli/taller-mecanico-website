import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriaInsumo } from '../../interfaces/inventario';
import { InventoryService } from '../../services/inventory.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-inventory',
  templateUrl: './modal-inventory.component.html',
  styleUrls: ['./modal-inventory.component.scss']
})
export class ModalInventoryComponent implements OnInit {

  // Título Modal
  tituloModal: string = 'Registrar un nuevo insumo'
  // Boton Agregar- Editar
  textoBoton: string = 'Agregar'

  // Inicializar lista de categorías insumo
  listaCategorias: CategoriaInsumo[] = []

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private dialogRef: MatDialogRef<ModalInventoryComponent>, // Referencia de este componente Modal
    @Inject(MAT_DIALOG_DATA) public datoInsumo: any, // datoServicio --> objeto element de la tabla


  ) { }

  // Formulario reactivo cliente
  formInventario = this.fb.group({

    descripcion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
    marca: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
    categoria: ['', [Validators.required]],
    unidad: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
  })


  ngOnInit(): void {
    this.obtenerCategoriasInsumo()

    if (this.datoInsumo) {

      this.tituloModal = 'Editar información del insumo'
      this.textoBoton = 'Editar'

      // Asignar valores desde el objecto element al formulario reactivo pra editar registro
      this.formInventario.controls['descripcion'].setValue(this.datoInsumo.descripcion)
      this.formInventario.controls['marca'].setValue(this.datoInsumo.marca)
      this.formInventario.controls['categoria'].setValue(this.datoInsumo.id_categoria)
      this.formInventario.controls['unidad'].setValue(this.datoInsumo.unidad)
    }
    console.log(this.formInventario.value);

  }

  // Obtener categorías de insumos
  obtenerCategoriasInsumo() {
    this.inventoryService.obtenerCategoriasInsumos()
      .subscribe({
        next: (data: CategoriaInsumo[]) => {
          this.listaCategorias = data
        }
      })
  }

  /*
  * Agregar - Editar inventario
  */
  agregarEditarInventario() {
    if (!this.datoInsumo) {
      this.agregarInsumo()
    }
    else {
      this.editarInsumo()
    }
  }

  // Agregar
  agregarInsumo() {
    this.inventoryService.agregarInsumo(this.formInventario.value).subscribe({
      next: (data: any) => {
        // Reiniciar formulario
        this.formInventario.reset();
        // Cerrar modal
        this.dialogRef.close('agregado');
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  // Editar
  editarInsumo() {
    this.inventoryService.editarInsumo(this.formInventario.value, this.datoInsumo.id)
      .subscribe({
        next: (data: any) => {
          Swal.fire({
            icon: 'info',
            title: 'Datos del insumo actualizados',
            showConfirmButton: false,
            timer: 1660
          })
          // Cerrar Modal
          this.dialogRef.close('actualizado')
        }
      })
  }

  /* MODAL */
  cerrarModal() {
    this.dialogRef.close('cerrado'); // Valor "cerrado al cerrar el modal"
  }
}
