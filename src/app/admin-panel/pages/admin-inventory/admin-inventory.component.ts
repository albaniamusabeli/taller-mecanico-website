import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalInventoryComponent } from '../../components/modal-inventory/modal-inventory.component';
import { Insumo } from '../../interfaces/inventario';
import { ExporterService } from '../../services/exporter.service';
import { InventoryService } from '../../services/inventory.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-inventory',
  templateUrl: './admin-inventory.component.html',
  styleUrls: ['./admin-inventory.component.scss']
})
export class AdminInventoryComponent implements OnInit {

  // Columnas Tabla inventario
  displayedColumns: string[] = [
    'categoria', 'marca', 'descripcion',
    'unidad', 'fechaCreado', 'fechaActualizado',
    'acciones',

  ];

  // Inicializar lista de insumos
  listaInsumos: Insumo[] = []

  // Inicializar dataSource
  dataSource = new MatTableDataSource(this.listaInsumos);

  // Inicializar paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private inventoryService: InventoryService,
    private exporterService: ExporterService,
    private dialog: MatDialog,


  ) { }

  ngOnInit(): void {
    // Ejecutar métodos
    this.obtenerInsumos();
  }

  // Obtener lista de insumos
  obtenerInsumos() {
    this.inventoryService.obtenerInsumos().subscribe({
      next: (data: Insumo[]) => {
        // Asignar datos del backend a lista de insumos
        this.listaInsumos = data
        // asignar el array de insumos a dataSource
        this.dataSource = new MatTableDataSource(this.listaInsumos);
        // Agregar paginador a dataSource
        this.dataSource.paginator = this.paginator


      }
    });
  }

  // Eliminar insumo del inventario
  eliminarInsumo(id:number){
    Swal.fire({
      title: '¿Está seguro de eliminar este insumo del inventario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, borrar insumo'
    }).then((result) => {
      // si el usuario confirma eliminación
      if (result.isConfirmed) {

        this.inventoryService.eliminarInsumo(id).subscribe({
          next: (data: any) => {
            //console.log(data);
            Swal.fire(
              'Borrado',
              data.message,
              'success'
            )
            this.obtenerInsumos();
          },
          error: (error) => {
            console.log(error);
            Swal.fire(
              'Lo sentimos',
              'No se pudo eliminar el insumo',
              'info'
            )

          }
        })
      }
    })
  }



  /*
  * Filtrar resultados de la tabla
  */
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /*
  * Exportar archivo Excel
  */
  exportarExcel() {
    this.exporterService.exportarExcel(this.dataSource.data, 'inventario');

  }

  /*
  * Modal
  */
  abrirModalAgregar(){
    this.dialog.open(ModalInventoryComponent, {
      width: '60%',
    })
    .afterClosed().subscribe(valor => {
      if (valor == 'agregado') {
        this.obtenerInsumos();
        // Mensaje confirmando la adición de un nuevo vehículo
        Swal.fire({
          icon: 'success',
          title: 'Insumo agregado correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          Swal.fire({
            title: 'Deseas agregar un nuevo insumo',
            text: "Si deseas puedes continuar agregando insumos",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Agregar y continuar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.abrirModalAgregar();
            }
          })
        })
      }
    })
  }

  abrirModalEditar(element: any){
    this.dialog.open(ModalInventoryComponent, {
      width: '60%',
      data: element // El modal va con datos del objeto servicio
    })
      .afterClosed().subscribe(valor => {
        if (valor == 'actualizado') {
          this.obtenerInsumos()
        }
      })
  }

}
