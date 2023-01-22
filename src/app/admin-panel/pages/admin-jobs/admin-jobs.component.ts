import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalJobComponent } from '../../components/modal-job/modal-job.component';
import { Trabajo } from '../../interfaces/trabajo';
import { JobService } from '../../services/job.service';
import Swal from 'sweetalert2';
import { ExporterService } from '../../services/exporter.service';

@Component({
  selector: 'app-admin-jobs',
  templateUrl: './admin-jobs.component.html',
  styleUrls: ['./admin-jobs.component.scss']
})
export class AdminJobsComponent implements OnInit {

  displayedColumns: string[] = [
    'patente', 'nombreServicio', 'empleado',
    'detalle', 'fechaTrabajo', 'valor', 'acciones'
  ];

  // Inicializar lista de trabajos
  listaTrabajos: Trabajo[] = []

  // dataSource
  dataSource = new MatTableDataSource(this.listaTrabajos)

  // Inicializar paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  constructor(
    private jobService: JobService,
    private dialog: MatDialog,
    private exporterService: ExporterService,

  ) { }

  ngOnInit(): void {
    // Llamar a obtenerTrabajos()
    this.obtenerTrabajos()
  }

  // Obtener lista de trabajos
  obtenerTrabajos() {
    this.jobService.obtenerTrabajos().subscribe({
      next: (data: Trabajo[]) => {
        console.log(data);

        // Asignar array de trabajos data a listatrabajos
        this.listaTrabajos = data
        // Agregar a dataSorce el array de trabajos
        this.dataSource = new MatTableDataSource(this.listaTrabajos)
        // Agregar paginador a dataSource
        this.dataSource.paginator = this.paginator

      }
    })
  }

  // Eliminar un trabajo
  eliminarTrabajo(id: number) {

    Swal.fire({
      title: '¿Está seguro de eliminar el trabajo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, borrar trabajo'
    }).then((result) => {
      // si el usuario confirma eliminación
      if (result.isConfirmed) {

        this.jobService.eliminarTrabajo(id).subscribe({
          next: (data: any) => {
            //console.log(data);
            Swal.fire(
              'Borrado',
              data.message,
              'success'
            )
            this.obtenerTrabajos();
          },
          error: (error) => {
            //console.log(error);
            Swal.fire(
              'Lo sentimos',
              'No se pudo eliminar el trabajo',
              'info'
            )

          }
        })
      }
    })
  }

  /* FILTRO
  */
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /* MODAL
  */

  // Abrir modal para agregar trabajo
  AbrirModalAgregar() {
    this.dialog.open(ModalJobComponent, {
      width: '60%',
    }).afterClosed().subscribe(valor => {
      if (valor == 'agregado') {
        this.obtenerTrabajos();
        // Mensaje confirmando la adición de un nuevo vehículo
        Swal.fire({
          icon: 'success',
          title: 'Trabajo agregado correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          Swal.fire({
            title: 'Deseas agregar un nuevo trabajo',
            text: "Si deseas puedes continuar agregando trabajos",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Agregar y continuar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.AbrirModalAgregar();
            }
          })
        })
      }
    })


  }

  AbrirModalEditar(element: any) {
    this.dialog.open(ModalJobComponent, {
      width: '60%',
      data: element // El modal va con datos del objeto trabajo
    })
      .afterClosed().subscribe(valor => {
        if (valor == 'actualizado') {
          this.obtenerTrabajos()
        }
      })
  }


  /* 
  * Exportar a Excel
  */
  exportarExcel(){
    this.exporterService.exportarExcel(this.dataSource.data, 'trabajos');
  }
}
